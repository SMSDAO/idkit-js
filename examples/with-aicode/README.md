# AiCode KIT Example

This example demonstrates how to use the AiCode KIT automation framework with IDKit-JS.

> **Note:** This is a documentation example showing the AiCode KIT API and usage patterns. The example files are for reference and illustration purposes.

## Features

- AI-powered code analysis
- Automated issue fixing
- Comprehensive testing
- Workflow automation
- Deployment to Vercel

## Usage Examples

### 1. Code Analysis

```typescript
import { AiEngine } from '../../app/core'

const engine = new AiEngine({
  verbose: true,
  maxDepth: 10
})

const result = await engine.analyze('src/')
console.log(`Health Score: ${result.score}`)
console.log(`Issues Found: ${result.issues.length}`)
```

### 2. Creating Workflows

```typescript
import { WorkflowBuilder } from '../../app/flow'

const workflow = new WorkflowBuilder('Example Workflow')
  .withDescription('Analyze, fix, and test code')
  .addAnalysisStep({ maxDepth: 10 })
  .addAutoFixStep({ dryRun: false })
  .addTestStep({ coverage: true })
  .build()

const result = await workflow.execute()
console.log(`Success: ${result.success}`)
```

### 3. Using Automation Utilities

```typescript
import { AutoFix, AutoTest } from '../../automation'

// Auto-fix issues
const autoFix = new AutoFix({
  dryRun: false,
  backup: true
})

const fixResult = await autoFix.fixAll('src/')
console.log(`Fixed: ${fixResult.fixed} issues`)

// Run tests
const autoTest = new AutoTest({
  coverage: true,
  watch: false
})

const testResult = await autoTest.runAll()
console.log(`Tests: ${testResult.passed} passed, ${testResult.failed} failed`)
```

### 4. Using the Orchestrator

```typescript
import { Orchestrator } from '../../automation/orchestrator'

const orchestrator = new Orchestrator({
  enableSync: true,
  enableConfig: true,
  enableRepair: true,
  enableFix: true,
  enableTest: true,
  verbose: true
})

// Run complete workflow
const result = await orchestrator.runComplete('src/')
console.log(`Steps completed: ${result.stepsCompleted.join(', ')}`)
```

## Configuration

Create an `aicode.config.ts` file:

```typescript
import { AiCodeConfig } from '../../app/config'

const config: AiCodeConfig = {
  projectName: 'AiCode Example',
  rootDir: '.',
  sourceDirs: ['src'],
  exclude: ['node_modules', 'build'],
  analysis: {
    enabled: true,
    maxDepth: 10,
    timeout: 30000,
    detectPatterns: true,
    analyzeComplexity: true
  },
  automation: {
    autoSync: true,
    autoConfig: true,
    autoRepair: true,
    autoFix: true,
    autoTest: true,
    autoComments: true
  },
  flow: {
    enabled: true,
    timeout: 300000,
    parallel: false,
    continueOnError: false
  }
}

export default config
```

## Project Structure

```
examples/with-aicode/
├── src/
│   ├── analyze.ts          # Analysis example
│   ├── auto-fix.ts         # Auto-fix example
│   ├── auto-test.ts        # Testing example
│   ├── deploy.ts           # Deployment example
│   └── run-workflow.ts     # Complete workflow example
├── aicode.config.ts        # AiCode configuration
├── package.json
└── README.md
```

## Learn More

- [AiCode KIT Documentation](../../docs/README.md)
- [Quick Start Guide](../../docs/guides/quick-start.md)
- [API Reference](../../docs/api/)

## License

MIT
