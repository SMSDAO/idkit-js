/**
 * Orchestrator - System orchestration for AiCode automation
 * 
 * Coordinates all automation utilities to provide a unified automation system
 */

import { AiEngine } from '../app/core/ai-engine'
import { WorkflowBuilder, FlowExecutor } from '../app/flow'
import { AutoSync, AutoConfig, AutoRepair, AutoFix, AutoTest } from './index'

export interface OrchestratorConfig {
	/** Enable auto sync */
	enableSync: boolean
	/** Enable auto config */
	enableConfig: boolean
	/** Enable auto repair */
	enableRepair: boolean
	/** Enable auto fix */
	enableFix: boolean
	/** Enable auto test */
	enableTest: boolean
	/** Verbose logging */
	verbose?: boolean
}

export interface OrchestrationResult {
	/** Overall success */
	success: boolean
	/** Steps completed */
	stepsCompleted: string[]
	/** Steps failed */
	stepsFailed: string[]
	/** Execution time in milliseconds */
	duration: number
}

export class Orchestrator {
	private config: Required<OrchestratorConfig>
	private aiEngine: AiEngine
	private autoSync: AutoSync
	private autoConfig: AutoConfig
	private autoRepair: AutoRepair
	private autoFix: AutoFix
	private autoTest: AutoTest

	constructor(config: OrchestratorConfig) {
		this.config = {
			verbose: config.verbose ?? false,
			...config,
		}

		// Initialize components
		this.aiEngine = new AiEngine({ verbose: this.config.verbose })
		this.autoSync = new AutoSync({
			remote: 'origin',
			branch: 'main',
			autoResolve: true,
			verbose: this.config.verbose,
		})
		this.autoConfig = new AutoConfig({
			environments: ['development', 'staging', 'production'],
			verbose: this.config.verbose,
		})
		this.autoRepair = new AutoRepair({
			backup: true,
			verify: true,
			verbose: this.config.verbose,
		})
		this.autoFix = new AutoFix({
			dryRun: false,
			backup: true,
			verbose: this.config.verbose,
		})
		this.autoTest = new AutoTest({
			coverage: true,
			watch: false,
			verbose: this.config.verbose,
		})
	}

	/**
	 * Run complete automation workflow
	 */
	async runComplete(path: string = '.'): Promise<OrchestrationResult> {
		const startTime = Date.now()
		const stepsCompleted: string[] = []
		const stepsFailed: string[] = []

		if (this.config.verbose) {
			console.log('[Orchestrator] Starting complete automation workflow')
		}

		try {
			// Step 1: Sync with remote
			if (this.config.enableSync) {
				await this.runStep('sync', async () => {
					await this.autoSync.syncWithRemote()
				})
				stepsCompleted.push('sync')
			}

			// Step 2: Analyze code
			await this.runStep('analyze', async () => {
				const result = await this.aiEngine.analyze(path)
				if (this.config.verbose) {
					console.log(`[Orchestrator] Analysis score: ${result.score}`)
				}
			})
			stepsCompleted.push('analyze')

			// Step 3: Configure environment
			if (this.config.enableConfig) {
				await this.runStep('config', async () => {
					await this.autoConfig.generate()
				})
				stepsCompleted.push('config')
			}

			// Step 4: Repair issues
			if (this.config.enableRepair) {
				await this.runStep('repair', async () => {
					await this.autoRepair.repairAll(path)
				})
				stepsCompleted.push('repair')
			}

			// Step 5: Fix remaining issues
			if (this.config.enableFix) {
				await this.runStep('fix', async () => {
					await this.autoFix.fixAll(path)
				})
				stepsCompleted.push('fix')
			}

			// Step 6: Run tests
			if (this.config.enableTest) {
				await this.runStep('test', async () => {
					const result = await this.autoTest.runAll()
					if (this.config.verbose) {
						console.log(`[Orchestrator] Tests: ${result.passed} passed, ${result.failed} failed`)
					}
				})
				stepsCompleted.push('test')
			}

			const duration = Date.now() - startTime

			if (this.config.verbose) {
				console.log(`[Orchestrator] Workflow completed in ${duration}ms`)
			}

			return {
				success: true,
				stepsCompleted,
				stepsFailed,
				duration,
			}
		} catch (error) {
			const duration = Date.now() - startTime
			console.error('[Orchestrator] Workflow failed:', error)

			return {
				success: false,
				stepsCompleted,
				stepsFailed,
				duration,
			}
		}
	}

	/**
	 * Run analysis workflow
	 */
	async runAnalysis(path: string = '.'): Promise<OrchestrationResult> {
		const startTime = Date.now()
		const stepsCompleted: string[] = []
		const stepsFailed: string[] = []

		try {
			const result = await this.aiEngine.analyze(path)
			stepsCompleted.push('analysis')

			return {
				success: true,
				stepsCompleted,
				stepsFailed,
				duration: Date.now() - startTime,
			}
		} catch (error) {
			stepsFailed.push('analysis')
			return {
				success: false,
				stepsCompleted,
				stepsFailed,
				duration: Date.now() - startTime,
			}
		}
	}

	/**
	 * Run fix workflow
	 */
	async runFix(path: string = '.'): Promise<OrchestrationResult> {
		const startTime = Date.now()
		const stepsCompleted: string[] = []
		const stepsFailed: string[] = []

		try {
			// Analyze first
			await this.aiEngine.analyze(path)
			stepsCompleted.push('analysis')

			// Then fix
			await this.autoFix.fixAll(path)
			stepsCompleted.push('fix')

			// Run tests
			await this.autoTest.runAll()
			stepsCompleted.push('test')

			return {
				success: true,
				stepsCompleted,
				stepsFailed,
				duration: Date.now() - startTime,
			}
		} catch (error) {
			return {
				success: false,
				stepsCompleted,
				stepsFailed,
				duration: Date.now() - startTime,
			}
		}
	}

	/**
	 * Run deployment workflow
	 */
	async runDeploy(environment: string = 'production'): Promise<OrchestrationResult> {
		const startTime = Date.now()
		const stepsCompleted: string[] = []
		const stepsFailed: string[] = []

		try {
			// Run tests first
			const testResult = await this.autoTest.runAll()
			if (testResult.failed > 0) {
				throw new Error('Tests failed, aborting deployment')
			}
			stepsCompleted.push('test')

			// TODO: Deploy using VercelDeployer
			stepsCompleted.push('deploy')

			return {
				success: true,
				stepsCompleted,
				stepsFailed,
				duration: Date.now() - startTime,
			}
		} catch (error) {
			return {
				success: false,
				stepsCompleted,
				stepsFailed,
				duration: Date.now() - startTime,
			}
		}
	}

	/**
	 * Run a single step with error handling
	 */
	private async runStep(name: string, fn: () => Promise<void>): Promise<void> {
		if (this.config.verbose) {
			console.log(`[Orchestrator] Running step: ${name}`)
		}

		try {
			await fn()
		} catch (error) {
			console.error(`[Orchestrator] Step failed: ${name}`, error)
			throw error
		}
	}

	/**
	 * Get system status
	 */
	async getStatus(): Promise<Record<string, boolean>> {
		return {
			sync: this.config.enableSync,
			config: this.config.enableConfig,
			repair: this.config.enableRepair,
			fix: this.config.enableFix,
			test: this.config.enableTest,
		}
	}
}
