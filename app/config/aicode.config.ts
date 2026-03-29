/**
 * AiCode Configuration
 * 
 * Main configuration file for the AiCode KIT system
 */

export interface AiCodeConfig {
	/** Project name */
	projectName: string
	/** Project root directory */
	rootDir: string
	/** Source directories to analyze */
	sourceDirs: string[]
	/** File patterns to exclude */
	exclude: string[]
	/** Analysis configuration */
	analysis: AnalysisConfig
	/** Automation configuration */
	automation: AutomationConfig
	/** Flow builder configuration */
	flow: FlowConfig
}

export interface AnalysisConfig {
	/** Enable code analysis */
	enabled: boolean
	/** Maximum analysis depth */
	maxDepth: number
	/** Analysis timeout in milliseconds */
	timeout: number
	/** Enable pattern detection */
	detectPatterns: boolean
	/** Enable complexity analysis */
	analyzeComplexity: boolean
}

export interface AutomationConfig {
	/** Enable auto-sync */
	autoSync: boolean
	/** Enable auto-config */
	autoConfig: boolean
	/** Enable auto-repair */
	autoRepair: boolean
	/** Enable auto-fix */
	autoFix: boolean
	/** Enable auto-test */
	autoTest: boolean
	/** Enable auto-comments */
	autoComments: boolean
}

export interface FlowConfig {
	/** Enable workflow execution */
	enabled: boolean
	/** Default execution timeout */
	timeout: number
	/** Enable parallel execution */
	parallel: boolean
	/** Continue on error */
	continueOnError: boolean
}

/**
 * Default AiCode configuration
 */
export const defaultConfig: AiCodeConfig = {
	projectName: 'IDKit',
	rootDir: '.',
	sourceDirs: ['packages', 'app', 'examples'],
	exclude: ['node_modules', 'build', 'dist', '.git', '.next'],
	analysis: {
		enabled: true,
		maxDepth: 10,
		timeout: 30000,
		detectPatterns: true,
		analyzeComplexity: true,
	},
	automation: {
		autoSync: true,
		autoConfig: true,
		autoRepair: true,
		autoFix: true,
		autoTest: true,
		autoComments: true,
	},
	flow: {
		enabled: true,
		timeout: 300000,
		parallel: false,
		continueOnError: false,
	},
}

/**
 * Load configuration from file or use default
 */
export function loadConfig(configPath?: string): AiCodeConfig {
	// TODO: Implement configuration loading from file
	return { ...defaultConfig }
}

/**
 * Merge partial configuration with defaults
 */
export function mergeConfig(partial: Partial<AiCodeConfig>): AiCodeConfig {
	return {
		...defaultConfig,
		...partial,
		analysis: {
			...defaultConfig.analysis,
			...(partial.analysis || {}),
		},
		automation: {
			...defaultConfig.automation,
			...(partial.automation || {}),
		},
		flow: {
			...defaultConfig.flow,
			...(partial.flow || {}),
		},
	}
}

/**
 * Validate configuration
 */
export function validateConfig(config: AiCodeConfig): { valid: boolean; errors: string[] } {
	const errors: string[] = []

	if (!config.projectName || config.projectName.trim().length === 0) {
		errors.push('Project name is required')
	}

	if (!config.rootDir || config.rootDir.trim().length === 0) {
		errors.push('Root directory is required')
	}

	if (!config.sourceDirs || config.sourceDirs.length === 0) {
		errors.push('At least one source directory is required')
	}

	if (config.analysis.maxDepth < 1) {
		errors.push('Analysis max depth must be at least 1')
	}

	if (config.analysis.timeout < 1000) {
		errors.push('Analysis timeout must be at least 1000ms')
	}

	return {
		valid: errors.length === 0,
		errors,
	}
}
