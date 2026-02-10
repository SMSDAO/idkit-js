/**
 * Complete Workflow Example
 * 
 * Demonstrates running a complete automation workflow with AiCode KIT
 */

import { Orchestrator } from '../../../automation/orchestrator'

async function main() {
	console.log('=== AiCode KIT Workflow Example ===\n')

	// Create orchestrator
	const orchestrator = new Orchestrator({
		enableSync: true,
		enableConfig: true,
		enableRepair: true,
		enableFix: true,
		enableTest: true,
		verbose: true,
	})

	console.log('Running complete automation workflow...\n')

	// Run complete workflow
	const result = await orchestrator.runComplete('.')

	console.log('\n=== Workflow Results ===')
	console.log(`Success: ${result.success}`)
	console.log(`Duration: ${result.duration}ms`)
	console.log(`Steps Completed: ${result.stepsCompleted.join(', ')}`)

	if (result.stepsFailed.length > 0) {
		console.log(`Steps Failed: ${result.stepsFailed.join(', ')}`)
	}

	// Get system status
	const status = await orchestrator.getStatus()
	console.log('\n=== System Status ===')
	console.log(JSON.stringify(status, null, 2))
}

main().catch(console.error)
