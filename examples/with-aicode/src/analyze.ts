/**
 * Analysis Example
 * 
 * Demonstrates code analysis with AiCode KIT
 */

import { AiEngine } from '../../../app/core'

async function main() {
	console.log('=== AiCode Analysis Example ===\n')

	// Create AI engine
	const engine = new AiEngine({
		verbose: true,
		maxDepth: 10,
		timeout: 30000,
	})

	console.log('Analyzing codebase...\n')

	// Analyze the codebase
	const result = await engine.analyze('.')

	console.log('\n=== Analysis Results ===')
	console.log(`Health Score: ${result.score}/100`)
	console.log(`Issues Found: ${result.issues.length}`)
	console.log(`Suggestions: ${result.suggestions.length}`)
	console.log(`Files Analyzed: ${result.metadata.filesAnalyzed}`)
	console.log(`Duration: ${result.metadata.duration}ms`)

	// Display issues
	if (result.issues.length > 0) {
		console.log('\n=== Issues ===')
		result.issues.slice(0, 5).forEach((issue, i) => {
			console.log(`${i + 1}. [${issue.severity}] ${issue.message}`)
			if (issue.file) {
				console.log(`   File: ${issue.file}:${issue.line || '?'}`)
			}
		})

		if (result.issues.length > 5) {
			console.log(`   ... and ${result.issues.length - 5} more issues`)
		}
	}

	// Display suggestions
	if (result.suggestions.length > 0) {
		console.log('\n=== Suggestions ===')
		result.suggestions.slice(0, 3).forEach((suggestion, i) => {
			console.log(`${i + 1}. [${suggestion.type}] ${suggestion.message}`)
		})

		if (result.suggestions.length > 3) {
			console.log(`   ... and ${result.suggestions.length - 3} more suggestions`)
		}
	}
}

main().catch(console.error)
