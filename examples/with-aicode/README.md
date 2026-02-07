# AiCode KIT Example

This example demonstrates how to use the AiCode KIT automation framework with IDKit-JS.

## Features

- AI-powered code analysis
- Automated issue fixing
- Comprehensive testing
- Workflow automation
- Deployment to Vercel

## Getting Started

### Installation

```bash
cd examples/with-aicode
pnpm install
```

### Running the Example

```bash
# Run the complete automation workflow
pnpm aicode:run

# Run analysis only
pnpm aicode:analyze

# Run auto-fix
pnpm aicode:fix

# Run tests
pnpm aicode:test

# Deploy
pnpm aicode:deploy
```

## Example Usage

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

## Scripts

```json
{
  "scripts": {
    "aicode:run": "node src/run-workflow.js",
    "aicode:analyze": "node src/analyze.js",
    "aicode:fix": "node src/auto-fix.js",
    "aicode:test": "node src/auto-test.js",
    "aicode:deploy": "node src/deploy.js"
  }
}
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
