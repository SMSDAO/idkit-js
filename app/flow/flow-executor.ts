/**
 * FlowExecutor - Workflow execution engine
 * 
 * Handles the execution of workflows with proper dependency management,
 * error handling, and result aggregation.
 */

import type { Workflow, WorkflowResult, WorkflowStep, StepResult } from './workflow-builder'

export interface ExecutionOptions {
	/** Enable verbose logging */
	verbose?: boolean
	/** Maximum execution time in milliseconds */
	timeout?: number
	/** Continue execution on step failure */
	continueOnError?: boolean
	/** Parallel execution when possible */
	parallel?: boolean
}

export interface ExecutionContext {
	/** Current step being executed */
	currentStep?: WorkflowStep
	/** Results from completed steps */
	completedSteps: Map<string, StepResult>
	/** Start time */
	startTime: number
	/** Execution options */
	options: Required<ExecutionOptions>
}

export class FlowExecutor {
	private options: Required<ExecutionOptions>

	constructor(options: ExecutionOptions = {}) {
		this.options = {
			verbose: options.verbose ?? false,
			timeout: options.timeout ?? 300000, // 5 minutes default
			continueOnError: options.continueOnError ?? false,
			parallel: options.parallel ?? false,
		}
	}

	/**
	 * Execute a workflow
	 */
	async execute(workflow: Workflow): Promise<WorkflowResult> {
		const context: ExecutionContext = {
			completedSteps: new Map(),
			startTime: Date.now(),
			options: this.options,
		}

		if (this.options.verbose) {
			console.log(`[FlowExecutor] Starting workflow: ${workflow.name}`)
			console.log(`[FlowExecutor] Steps: ${workflow.steps.length}`)
		}

		const errors: Error[] = []

		try {
			if (this.options.parallel) {
				await this.executeParallel(workflow.steps, context)
			} else {
				await this.executeSequential(workflow.steps, context)
			}
		} catch (error) {
			const err = error instanceof Error ? error : new Error(String(error))
			errors.push(err)
		}

		const duration = Date.now() - context.startTime

		if (this.options.verbose) {
			console.log(`[FlowExecutor] Workflow completed in ${duration}ms`)
		}

		return {
			success: errors.length === 0 && this.allStepsSucceeded(context.completedSteps),
			stepResults: context.completedSteps,
			duration,
			errors,
		}
	}

	/**
	 * Execute steps sequentially
	 */
	private async executeSequential(steps: WorkflowStep[], context: ExecutionContext): Promise<void> {
		for (const step of steps) {
			context.currentStep = step

			// Check dependencies
			if (!this.dependenciesMet(step, context.completedSteps)) {
				throw new Error(`Dependencies not met for step: ${step.name}`)
			}

			// Execute step
			const result = await this.executeStep(step, context)
			context.completedSteps.set(step.id, result)

			// Check if we should continue
			if (!result.success && !this.options.continueOnError) {
				throw new Error(`Step failed: ${step.name}`)
			}
		}
	}

	/**
	 * Execute steps in parallel where possible
	 */
	private async executeParallel(steps: WorkflowStep[], context: ExecutionContext): Promise<void> {
		const pending = new Set(steps.map(s => s.id))
		const executing = new Map<string, Promise<StepResult>>()

		while (pending.size > 0 || executing.size > 0) {
			// Find steps ready to execute
			const ready = Array.from(pending).filter(stepId => {
				const step = steps.find(s => s.id === stepId)!
				return this.dependenciesMet(step, context.completedSteps)
			})

			// Start executing ready steps
			for (const stepId of ready) {
				const step = steps.find(s => s.id === stepId)!
				pending.delete(stepId)

				context.currentStep = step
				const promise = this.executeStep(step, context)
				executing.set(stepId, promise)

				// Handle completion
				promise.then(result => {
					context.completedSteps.set(stepId, result)
					executing.delete(stepId)

					if (!result.success && !this.options.continueOnError) {
						throw new Error(`Step failed: ${step.name}`)
					}
				})
			}

			// Wait for at least one step to complete
			if (executing.size > 0) {
				await Promise.race(Array.from(executing.values()))
			}

			// Prevent infinite loop
			if (ready.length === 0 && executing.size === 0 && pending.size > 0) {
				throw new Error('Deadlock detected: steps have unmet dependencies')
			}
		}
	}

	/**
	 * Execute a single step
	 */
	private async executeStep(step: WorkflowStep, context: ExecutionContext): Promise<StepResult> {
		const startTime = Date.now()

		if (this.options.verbose) {
			console.log(`[FlowExecutor] Executing step: ${step.name}`)
		}

		try {
			// Check timeout
			const elapsed = Date.now() - context.startTime
			if (elapsed > this.options.timeout) {
				throw new Error('Workflow execution timeout')
			}

			// Execute step based on type
			const output = await this.executeStepByType(step)

			const duration = Date.now() - startTime

			if (this.options.verbose) {
				console.log(`[FlowExecutor] Step completed: ${step.name} (${duration}ms)`)
			}

			return {
				stepId: step.id,
				success: true,
				output,
				duration,
			}
		} catch (error) {
			const err = error instanceof Error ? error : new Error(String(error))
			const duration = Date.now() - startTime

			if (this.options.verbose) {
				console.error(`[FlowExecutor] Step failed: ${step.name}`, err)
			}

			return {
				stepId: step.id,
				success: false,
				output: null,
				duration,
				error: err,
			}
		}
	}

	/**
	 * Execute step based on its type
	 */
	private async executeStepByType(step: WorkflowStep): Promise<any> {
		// TODO: Implement actual step execution logic based on type
		switch (step.type) {
			case 'analysis':
				return { analyzed: true }
			case 'fix':
				return { fixed: true }
			case 'test':
				return { tested: true }
			case 'deploy':
				return { deployed: true }
			case 'custom':
				return { executed: true }
			default:
				throw new Error(`Unknown step type: ${step.type}`)
		}
	}

	/**
	 * Check if step dependencies are met
	 */
	private dependenciesMet(step: WorkflowStep, completed: Map<string, StepResult>): boolean {
		return step.dependencies.every(depId => {
			const result = completed.get(depId)
			return result && result.success
		})
	}

	/**
	 * Check if all steps succeeded
	 */
	private allStepsSucceeded(results: Map<string, StepResult>): boolean {
		return Array.from(results.values()).every(result => result.success)
	}
}
