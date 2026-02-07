/**
 * PatternDetector - Pattern recognition for code improvements
 * 
 * Detects common patterns, best practices, and opportunities for code improvements
 * across the codebase.
 */

export interface Pattern {
	/** Pattern name */
	name: string
	/** Pattern description */
	description: string
	/** Pattern category */
	category: 'design' | 'performance' | 'security' | 'maintainability'
	/** Confidence score (0-1) */
	confidence: number
}

export interface PatternMatch {
	/** Matched pattern */
	pattern: Pattern
	/** File location */
	file: string
	/** Line number */
	line: number
	/** Code snippet */
	snippet: string
	/** Suggested improvement */
	suggestion?: string
}

export class PatternDetector {
	private patterns: Map<string, Pattern>

	constructor() {
		this.patterns = new Map()
		this.initializePatterns()
	}

	/**
	 * Detect patterns in code
	 */
	detect(code: string, filePath?: string): PatternMatch[] {
		const matches: PatternMatch[] = []
		const lines = code.split('\n')

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i]

			// Check each pattern
			for (const pattern of this.patterns.values()) {
				const match = this.matchPattern(pattern, line, lines, i)
				if (match) {
					matches.push({
						pattern,
						file: filePath || 'unknown',
						line: i + 1,
						snippet: line.trim(),
						suggestion: match.suggestion,
					})
				}
			}
		}

		return matches
	}

	/**
	 * Register a custom pattern
	 */
	registerPattern(pattern: Pattern): void {
		this.patterns.set(pattern.name, pattern)
	}

	/**
	 * Get all registered patterns
	 */
	getPatterns(): Pattern[] {
		return Array.from(this.patterns.values())
	}

	/**
	 * Initialize built-in patterns
	 */
	private initializePatterns(): void {
		// Singleton pattern
		this.patterns.set('singleton', {
			name: 'singleton',
			description: 'Singleton pattern implementation',
			category: 'design',
			confidence: 0.8,
		})

		// Factory pattern
		this.patterns.set('factory', {
			name: 'factory',
			description: 'Factory pattern implementation',
			category: 'design',
			confidence: 0.8,
		})

		// Observer pattern
		this.patterns.set('observer', {
			name: 'observer',
			description: 'Observer pattern implementation',
			category: 'design',
			confidence: 0.7,
		})

		// Async/await pattern
		this.patterns.set('async-await', {
			name: 'async-await',
			description: 'Modern async/await usage',
			category: 'maintainability',
			confidence: 0.9,
		})

		// Error handling pattern
		this.patterns.set('error-handling', {
			name: 'error-handling',
			description: 'Proper error handling implementation',
			category: 'maintainability',
			confidence: 0.8,
		})

		// Security: SQL injection vulnerability
		this.patterns.set('sql-injection', {
			name: 'sql-injection',
			description: 'Potential SQL injection vulnerability',
			category: 'security',
			confidence: 0.9,
		})

		// Performance: inefficient loop
		this.patterns.set('inefficient-loop', {
			name: 'inefficient-loop',
			description: 'Inefficient loop operation',
			category: 'performance',
			confidence: 0.7,
		})
	}

	/**
	 * Match a pattern against code
	 */
	private matchPattern(
		pattern: Pattern,
		line: string,
		allLines: string[],
		lineIndex: number
	): { suggestion?: string } | null {
		const trimmedLine = line.trim()

		switch (pattern.name) {
			case 'async-await':
				if (trimmedLine.includes('async') || trimmedLine.includes('await')) {
					return {}
				}
				break

			case 'error-handling':
				if (trimmedLine.includes('try') || trimmedLine.includes('catch')) {
					return {}
				}
				break

			case 'sql-injection':
				if (
					trimmedLine.includes('query') &&
					trimmedLine.includes('+') &&
					!trimmedLine.includes('parameterized')
				) {
					return {
						suggestion: 'Use parameterized queries to prevent SQL injection',
					}
				}
				break

			case 'inefficient-loop':
				if (trimmedLine.match(/for\s*\(.*\.length.*\)/)) {
					return {
						suggestion: 'Consider caching array length or using for...of loop',
					}
				}
				break
		}

		return null
	}

	/**
	 * Analyze pattern usage across multiple files
	 */
	analyzePatternUsage(files: Map<string, string>): Map<string, number> {
		const usage = new Map<string, number>()

		for (const [filePath, code] of files) {
			const matches = this.detect(code, filePath)

			for (const match of matches) {
				const count = usage.get(match.pattern.name) || 0
				usage.set(match.pattern.name, count + 1)
			}
		}

		return usage
	}
}
