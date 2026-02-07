# Quick Start Guide

Get started with AiCode KIT in 5 minutes.

## Installation

AiCode KIT is included in the IDKit-JS repository. Clone and install:

```bash
git clone https://github.com/SMSDAO/idkit-js.git
cd idkit-js
pnpm install
```

## Basic Usage

### 1. Analyze Your Code

```typescript
import { AiEngine } from './app/core'

const engine = new AiEngine()
const result = await engine.analyze('packages/core')

console.log(`Health Score: ${result.score}/100`)
console.log(`Issues: ${result.issues.length}`)
```

### 2. Create a Workflow

```typescript
import { WorkflowBuilder } from './app/flow'

const workflow = new WorkflowBuilder('Quick Analysis')
  .addAnalysisStep()
  .addAutoFixStep()
  .build()

const result = await workflow.execute()
```

### 3. Configure AiCode KIT

Create `aicode.config.js` in your project root:

```javascript
export default {
  projectName: 'My Project',
  sourceDirs: ['src', 'packages'],
  analysis: {
    enabled: true,
    detectPatterns: true
  },
  automation: {
    autoFix: true,
    autoTest: true
  }
}
```

## Next Steps

- Read the [Configuration Guide](./configuration.md)
- Explore [Automation Utilities](../automation/)
- Learn about [Creating Workflows](./workflows.md)

## Example Project

Check out the `examples/with-aicode/` directory for a complete example.
