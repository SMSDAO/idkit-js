/**
 * FlowValidators - Workflow validation utilities
 * 
 * Provides validation for workflow definitions, steps, and configurations
 * to ensure they are well-formed and executable.
 */

import type { Workflow, WorkflowStep } from './workflow-builder'
import type { ActionNode } from './action-nodes'

export interface ValidationResult {
	/** Is valid */
	valid: boolean
	/** Validation errors */
	errors: ValidationError[]
	/** Validation warnings */
	warnings: ValidationWarning[]
}

export interface ValidationError {
	/** Error message */
	message: string
	/** Error code */
	code: string
	/** Related step ID */
	stepId?: string
	/** Severity level */
	severity: 'error'
}

export interface ValidationWarning {
	/** Warning message */
	message: string
	/** Warning code */
	code: string
	/** Related step ID */
	stepId?: string
	/** Severity level */
	severity: 'warning'
}

export class FlowValidator {
	/**
	 * Validate a complete workflow
	 */
	validate(workflow: Workflow): ValidationResult {
		const errors: ValidationError[] = []
		const warnings: ValidationWarning[] = []

		// Validate workflow structure
		if (!workflow.id) {
			errors.push({
				message: 'Workflow must have an ID',
				code: 'MISSING_ID',
				severity: 'error',
			})
		}

		if (!workflow.name || workflow.name.trim().length === 0) {
			errors.push({
				message: 'Workflow must have a name',
				code: 'MISSING_NAME',
				severity: 'error',
			})
		}

		if (!workflow.steps || workflow.steps.length === 0) {
			errors.push({
				message: 'Workflow must have at least one step',
				code: 'NO_STEPS',
				severity: 'error',
			})
		}

		// Validate each step
		if (workflow.steps) {
			for (const step of workflow.steps) {
				const stepValidation = this.validateStep(step, workflow.steps)
				errors.push(...stepValidation.errors)
				warnings.push(...stepValidation.warnings)
			}
		}

		// Check for circular dependencies
		if (workflow.steps) {
			const circularDeps = this.detectCircularDependencies(workflow.steps)
			if (circularDeps.length > 0) {
				errors.push({
					message: `Circular dependencies detected: ${circularDeps.join(', ')}`,
					code: 'CIRCULAR_DEPS',
					severity: 'error',
				})
			}
		}

		return {
			valid: errors.length === 0,
			errors,
			warnings,
		}
	}

	/**
	 * Validate a single workflow step
	 */
	validateStep(step: WorkflowStep, allSteps: WorkflowStep[]): ValidationResult {
		const errors: ValidationError[] = []
		const warnings: ValidationWarning[] = []

		// Basic validation
		if (!step.id) {
			errors.push({
				message: 'Step must have an ID',
				code: 'MISSING_STEP_ID',
				stepId: step.id,
				severity: 'error',
			})
		}

		if (!step.name || step.name.trim().length === 0) {
			errors.push({
				message: 'Step must have a name',
				code: 'MISSING_STEP_NAME',
				stepId: step.id,
				severity: 'error',
			})
		}

		if (!step.type) {
			errors.push({
				message: 'Step must have a type',
				code: 'MISSING_STEP_TYPE',
				stepId: step.id,
				severity: 'error',
			})
		}

		// Validate dependencies
		if (step.dependencies) {
			for (const depId of step.dependencies) {
				const depExists = allSteps.some(s => s.id === depId)
				if (!depExists) {
					errors.push({
						message: `Step depends on non-existent step: ${depId}`,
						code: 'INVALID_DEPENDENCY',
						stepId: step.id,
						severity: 'error',
					})
				}
			}
		}

		// Validate configuration
		if (!step.config) {
			warnings.push({
				message: 'Step has no configuration',
				code: 'NO_CONFIG',
				stepId: step.id,
				severity: 'warning',
			})
		}

		return {
			valid: errors.length === 0,
			errors,
			warnings,
		}
	}

	/**
	 * Validate an action node
	 */
	validateActionNode(node: ActionNode): ValidationResult {
		const errors: ValidationError[] = []
		const warnings: ValidationWarning[] = []

		if (!node.id) {
			errors.push({
				message: 'Action node must have an ID',
				code: 'MISSING_NODE_ID',
				severity: 'error',
			})
		}

		if (!node.type) {
			errors.push({
				message: 'Action node must have a type',
				code: 'MISSING_NODE_TYPE',
				severity: 'error',
			})
		}

		if (!node.inputs || node.inputs.length === 0) {
			warnings.push({
				message: 'Action node has no inputs',
				code: 'NO_INPUTS',
				severity: 'warning',
			})
		}

		if (!node.outputs || node.outputs.length === 0) {
			warnings.push({
				message: 'Action node has no outputs',
				code: 'NO_OUTPUTS',
				severity: 'warning',
			})
		}

		return {
			valid: errors.length === 0,
			errors,
			warnings,
		}
	}

	/**
	 * Detect circular dependencies in workflow steps
	 */
	private detectCircularDependencies(steps: WorkflowStep[]): string[] {
		const graph = new Map<string, string[]>()

		// Build dependency graph
		for (const step of steps) {
			graph.set(step.id, step.dependencies || [])
		}

		// Detect cycles using DFS
		const visited = new Set<string>()
		const recursionStack = new Set<string>()
		const cycles: string[] = []

		const dfs = (nodeId: string, path: string[]): boolean => {
			visited.add(nodeId)
			recursionStack.add(nodeId)
			path.push(nodeId)

			const neighbors = graph.get(nodeId) || []
			for (const neighbor of neighbors) {
				if (!visited.has(neighbor)) {
					if (dfs(neighbor, path)) {
						return true
					}
				} else if (recursionStack.has(neighbor)) {
					// Found a cycle
					const cycleStart = path.indexOf(neighbor)
					const cycle = path.slice(cycleStart).join(' -> ')
					cycles.push(cycle)
					return true
				}
			}

			recursionStack.delete(nodeId)
			path.pop()
			return false
		}

		for (const step of steps) {
			if (!visited.has(step.id)) {
				dfs(step.id, [])
			}
		}

		return cycles
	}

	/**
	 * Check if workflow is executable
	 */
	canExecute(workflow: Workflow): { executable: boolean; reason?: string } {
		const validation = this.validate(workflow)

		if (!validation.valid) {
			return {
				executable: false,
				reason: validation.errors[0]?.message || 'Validation failed',
			}
		}

		// Check if all steps have valid types
		const validTypes = ['analysis', 'fix', 'test', 'deploy', 'custom']
		for (const step of workflow.steps) {
			if (!validTypes.includes(step.type)) {
				return {
					executable: false,
					reason: `Invalid step type: ${step.type}`,
				}
			}
		}

		return { executable: true }
	}
}
