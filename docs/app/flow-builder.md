# Flow Builder

The Flow Builder provides a visual and programmatic way to create automated workflows for IDKit-JS development.

## Overview

The Flow Builder consists of several components:
- **WorkflowBuilder** - Fluent API for constructing workflows
- **ActionNodes** - Reusable action components
- **FlowExecutor** - Executes workflows with dependency management
- **FlowValidators** - Validates workflow definitions

## Creating Workflows

### Basic Workflow

```typescript
import { WorkflowBuilder } from './app/flow'

const workflow = new WorkflowBuilder('My Workflow')
  .withDescription('Analyze and fix code')
  .addAnalysisStep({ maxDepth: 10 })
  .addAutoFixStep({ dryRun: false })
  .addTestStep({ coverage: true })
  .build()

// Execute workflow
const result = await workflow.execute()
console.log(`Success: ${result.success}`)
```

### Advanced Workflow with Dependencies

```typescript
const workflow = new WorkflowBuilder('CI Pipeline')
  .addCustomStep('lint', { command: 'pnpm lint' })
  .addCustomStep('typecheck', { command: 'pnpm tsc' })
  .addTestStep({ coverage: true })
  .addDeployStep({ environment: 'production' })
  .build()
```

## Action Nodes

### Available Action Nodes

- **AnalysisActionNode** - Code analysis
- **AutoFixActionNode** - Automatic fixing
- **TestActionNode** - Test execution
- **DeployActionNode** - Deployment

### Creating Custom Action Nodes

```typescript
import { ActionNode, ActionInput, ActionOutput } from './app/flow'

class CustomActionNode implements ActionNode {
  id = 'custom_action'
  type = 'custom'
  label = 'Custom Action'
  
  inputs: ActionInput[] = [
    { name: 'input', type: 'string', required: true }
  ]
  
  outputs: ActionOutput[] = [
    { name: 'result', type: 'string' }
  ]
  
  async execute(inputs: Record<string, any>) {
    // Your custom logic
    return { result: 'success' }
  }
}
```

## Workflow Execution

### Sequential Execution

```typescript
import { FlowExecutor } from './app/flow'

const executor = new FlowExecutor({
  verbose: true,
  timeout: 300000
})

const result = await executor.execute(workflow)
```

### Parallel Execution

```typescript
const executor = new FlowExecutor({
  parallel: true,
  continueOnError: false
})

const result = await executor.execute(workflow)
```

## Workflow Validation

```typescript
import { FlowValidator } from './app/flow'

const validator = new FlowValidator()
const validation = validator.validate(workflow)

if (!validation.valid) {
  console.error('Validation errors:', validation.errors)
}
```

## Examples

See [Advanced Workflows](../guides/examples/advanced-workflows.md) for more examples.
