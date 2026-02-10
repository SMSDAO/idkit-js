/**
 * Code Analysis Rules Configuration
 * 
 * Defines rules and patterns for code analysis
 */

export interface AnalysisRule {
	/** Rule ID */
	id: string
	/** Rule name */
	name: string
	/** Rule description */
	description: string
	/** Rule category */
	category: 'security' | 'performance' | 'maintainability' | 'style' | 'best-practice'
	/** Rule severity */
	severity: 'critical' | 'warning' | 'info'
	/** Is enabled */
	enabled: boolean
	/** Pattern to match */
	pattern?: string | RegExp
	/** Custom check function */
	check?: (code: string) => boolean
}

export interface RulesConfig {
	/** Security rules */
	security: AnalysisRule[]
	/** Performance rules */
	performance: AnalysisRule[]
	/** Maintainability rules */
	maintainability: AnalysisRule[]
	/** Style rules */
	style: AnalysisRule[]
	/** Best practice rules */
	bestPractices: AnalysisRule[]
}

/**
 * Default analysis rules
 */
export const defaultRules: RulesConfig = {
	security: [
		{
			id: 'no-eval',
			name: 'No eval usage',
			description: 'Avoid using eval() as it can execute arbitrary code',
			category: 'security',
			severity: 'critical',
			enabled: true,
			pattern: /\beval\s*\(/,
		},
		{
			id: 'no-sql-injection',
			name: 'Prevent SQL injection',
			description: 'Use parameterized queries to prevent SQL injection',
			category: 'security',
			severity: 'critical',
			enabled: true,
		},
		{
			id: 'no-xss',
			name: 'Prevent XSS',
			description: 'Sanitize user input to prevent cross-site scripting',
			category: 'security',
			severity: 'critical',
			enabled: true,
		},
	],
	performance: [
		{
			id: 'cache-array-length',
			name: 'Cache array length',
			description: 'Cache array length in loops for better performance',
			category: 'performance',
			severity: 'info',
			enabled: true,
			pattern: /for\s*\([^;]*;\s*\w+\s*<\s*\w+\.length/,
		},
		{
			id: 'avoid-nested-loops',
			name: 'Avoid nested loops',
			description: 'Nested loops can lead to poor performance',
			category: 'performance',
			severity: 'warning',
			enabled: true,
		},
	],
	maintainability: [
		{
			id: 'max-function-length',
			name: 'Maximum function length',
			description: 'Functions should not exceed 50 lines',
			category: 'maintainability',
			severity: 'warning',
			enabled: true,
		},
		{
			id: 'max-complexity',
			name: 'Maximum cyclomatic complexity',
			description: 'Functions should have complexity less than 10',
			category: 'maintainability',
			severity: 'warning',
			enabled: true,
		},
		{
			id: 'no-empty-catch',
			name: 'No empty catch blocks',
			description: 'Catch blocks should not be empty',
			category: 'maintainability',
			severity: 'warning',
			enabled: true,
			pattern: /catch\s*\([^)]*\)\s*\{\s*\}/,
		},
	],
	style: [
		{
			id: 'no-var',
			name: 'No var keyword',
			description: 'Use let or const instead of var',
			category: 'style',
			severity: 'info',
			enabled: true,
			pattern: /\bvar\s+/,
		},
		{
			id: 'prefer-const',
			name: 'Prefer const',
			description: 'Use const for variables that are not reassigned',
			category: 'style',
			severity: 'info',
			enabled: true,
		},
	],
	bestPractices: [
		{
			id: 'use-strict-equality',
			name: 'Use strict equality',
			description: 'Use === and !== instead of == and !=',
			category: 'best-practice',
			severity: 'warning',
			enabled: true,
			pattern: /[^=!]==[^=]|[^=!]!=[^=]/,
		},
		{
			id: 'handle-promises',
			name: 'Handle promises',
			description: 'Always handle promise rejections',
			category: 'best-practice',
			severity: 'warning',
			enabled: true,
		},
		{
			id: 'no-console',
			name: 'No console statements',
			description: 'Remove console statements from production code',
			category: 'best-practice',
			severity: 'info',
			enabled: false,
			pattern: /console\.(log|warn|error|debug)/,
		},
	],
}

/**
 * Get enabled rules
 */
export function getEnabledRules(config: RulesConfig): AnalysisRule[] {
	const allRules = [
		...config.security,
		...config.performance,
		...config.maintainability,
		...config.style,
		...config.bestPractices,
	]

	return allRules.filter(rule => rule.enabled)
}

/**
 * Get rules by category
 */
export function getRulesByCategory(
	config: RulesConfig,
	category: AnalysisRule['category']
): AnalysisRule[] {
	switch (category) {
		case 'security':
			return config.security
		case 'performance':
			return config.performance
		case 'maintainability':
			return config.maintainability
		case 'style':
			return config.style
		case 'best-practice':
			return config.bestPractices
		default:
			return []
	}
}

/**
 * Get rules by severity
 */
export function getRulesBySeverity(
	config: RulesConfig,
	severity: AnalysisRule['severity']
): AnalysisRule[] {
	const allRules = getEnabledRules(config)
	return allRules.filter(rule => rule.severity === severity)
}
