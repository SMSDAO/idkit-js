/**
 * WorkflowBuilder - Visual workflow construction
 * 
 * Provides a fluent API for building automated workflows with multiple steps
 * and actions.
 */

export interface WorkflowStep {
	/** Step unique identifier */
	id: string
	/** Step type */
	type: 'analysis' | 'fix' | 'test' | 'deploy' | 'custom'
	/** Step name */
	name: string
	/** Step configuration */
	config: Record<string, any>
	/** Step dependencies (IDs of steps that must complete first) */
	dependencies: string[]
}

export interface Workflow {
	/** Workflow unique identifier */
	id: string
	/** Workflow name */
	name: string
	/** Workflow description */
	description?: string
	/** Workflow steps */
	steps: WorkflowStep[]
	/** Execute the workflow */
	execute(): Promise<WorkflowResult>
}

export interface WorkflowResult {
	/** Overall success status */
	success: boolean
	/** Results from each step */
	stepResults: Map<string, StepResult>
	/** Total execution time in milliseconds */
	duration: number
	/** Execution errors */
	errors: Error[]
}

export interface StepResult {
	/** Step ID */
	stepId: string
	/** Success status */
	success: boolean
	/** Step output data */
	output: any
	/** Execution time in milliseconds */
	duration: number
	/** Error if step failed */
	error?: Error
}

export class WorkflowBuilder {
	private steps: WorkflowStep[] = []
	private workflowId: string
	private workflowName: string
	private workflowDescription?: string

	constructor(name: string = 'Unnamed Workflow') {
		this.workflowId = `workflow_${Date.now()}`
		this.workflowName = name
	}

	/**
	 * Set workflow description
	 */
	withDescription(description: string): this {
		this.workflowDescription = description
		return this
	}

	/**
	 * Add an analysis step
	 */
	addAnalysisStep(config: Record<string, any> = {}): this {
		this.steps.push({
			id: `step_${this.steps.length + 1}`,
			type: 'analysis',
			name: 'Code Analysis',
			config,
			dependencies: [],
		})
		return this
	}

	/**
	 * Add an auto-fix step
	 */
	addAutoFixStep(config: Record<string, any> = {}): this {
		const prevStepId = this.steps.length > 0 ? this.steps[this.steps.length - 1].id : ''
		this.steps.push({
			id: `step_${this.steps.length + 1}`,
			type: 'fix',
			name: 'Auto Fix',
			config,
			dependencies: prevStepId ? [prevStepId] : [],
		})
		return this
	}

	/**
	 * Add a test step
	 */
	addTestStep(config: Record<string, any> = {}): this {
		const prevStepId = this.steps.length > 0 ? this.steps[this.steps.length - 1].id : ''
		this.steps.push({
			id: `step_${this.steps.length + 1}`,
			type: 'test',
			name: 'Run Tests',
			config,
			dependencies: prevStepId ? [prevStepId] : [],
		})
		return this
	}

	/**
	 * Add a deployment step
	 */
	addDeployStep(config: Record<string, any> = {}): this {
		const prevStepId = this.steps.length > 0 ? this.steps[this.steps.length - 1].id : ''
		this.steps.push({
			id: `step_${this.steps.length + 1}`,
			type: 'deploy',
			name: 'Deploy',
			config,
			dependencies: prevStepId ? [prevStepId] : [],
		})
		return this
	}

	/**
	 * Add a custom step
	 */
	addCustomStep(name: string, config: Record<string, any> = {}, dependencies: string[] = []): this {
		this.steps.push({
			id: `step_${this.steps.length + 1}`,
			type: 'custom',
			name,
			config,
			dependencies,
		})
		return this
	}

	/**
	 * Build and return the workflow
	 */
	build(): Workflow {
		const steps = [...this.steps]
		const id = this.workflowId
		const name = this.workflowName
		const description = this.workflowDescription

		return {
			id,
			name,
			description,
			steps,
			async execute(): Promise<WorkflowResult> {
				const startTime = Date.now()
				const stepResults = new Map<string, StepResult>()
				const errors: Error[] = []

				// Execute steps in order, respecting dependencies
				for (const step of steps) {
					const stepStartTime = Date.now()

					try {
						// Check if dependencies are met
						for (const depId of step.dependencies) {
							const depResult = stepResults.get(depId)
							if (!depResult || !depResult.success) {
								throw new Error(`Dependency ${depId} failed or not completed`)
							}
						}

						// Execute step (placeholder implementation)
						const output = await executeStep(step)

						stepResults.set(step.id, {
							stepId: step.id,
							success: true,
							output,
							duration: Date.now() - stepStartTime,
						})
					} catch (error) {
						const err = error instanceof Error ? error : new Error(String(error))
						errors.push(err)

						stepResults.set(step.id, {
							stepId: step.id,
							success: false,
							output: null,
							duration: Date.now() - stepStartTime,
							error: err,
						})
					}
				}

				return {
					success: errors.length === 0,
					stepResults,
					duration: Date.now() - startTime,
					errors,
				}
			},
		}
	}

	/**
	 * Validate workflow before building
	 */
	validate(): { valid: boolean; errors: string[] } {
		const errors: string[] = []

		if (this.steps.length === 0) {
			errors.push('Workflow must have at least one step')
		}

		// Check for circular dependencies
		const visited = new Set<string>()
		const recursionStack = new Set<string>()

		const hasCycle = (stepId: string): boolean => {
			visited.add(stepId)
			recursionStack.add(stepId)

			const step = this.steps.find(s => s.id === stepId)
			if (step) {
				for (const depId of step.dependencies) {
					if (!visited.has(depId)) {
						if (hasCycle(depId)) return true
					} else if (recursionStack.has(depId)) {
						return true
					}
				}
			}

			recursionStack.delete(stepId)
			return false
		}

		for (const step of this.steps) {
			if (!visited.has(step.id)) {
				if (hasCycle(step.id)) {
					errors.push('Workflow contains circular dependencies')
					break
				}
			}
		}

		return {
			valid: errors.length === 0,
			errors,
		}
	}
}

/**
 * Execute a workflow step (placeholder implementation)
 */
async function executeStep(step: WorkflowStep): Promise<any> {
	// TODO: Implement actual step execution based on step type
	console.log(`Executing step: ${step.name} (${step.type})`)
	return { success: true }
}
