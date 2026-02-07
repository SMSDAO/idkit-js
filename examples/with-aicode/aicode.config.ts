/**
 * AiCode Configuration Example
 */

import { AiCodeConfig } from '../../../app/config'

const config: AiCodeConfig = {
	projectName: 'AiCode Example',
	rootDir: '.',
	sourceDirs: ['src'],
	exclude: ['node_modules', 'build', 'dist'],
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

export default config
