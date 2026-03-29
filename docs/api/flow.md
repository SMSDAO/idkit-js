# Flow API Reference

Complete API reference for AiCode KIT flow builder.

## WorkflowBuilder

### Constructor

```typescript
new WorkflowBuilder(name?: string)
```

### Methods

#### withDescription(description)

Set workflow description.

```typescript
withDescription(description: string): this
```

#### addAnalysisStep(config)

Add an analysis step.

```typescript
addAnalysisStep(config?: Record<string, any>): this
```

#### addAutoFixStep(config)

Add an auto-fix step.

```typescript
addAutoFixStep(config?: Record<string, any>): this
```

#### addTestStep(config)

Add a test step.

```typescript
addTestStep(config?: Record<string, any>): this
```

#### addDeployStep(config)

Add a deployment step.

```typescript
addDeployStep(config?: Record<string, any>): this
```

#### addCustomStep(name, config, dependencies)

Add a custom step.

```typescript
addCustomStep(
  name: string,
  config?: Record<string, any>,
  dependencies?: string[]
): this
```

#### build()

Build and return the workflow.

```typescript
build(): Workflow
```

#### validate()

Validate workflow before building.

```typescript
validate(): { valid: boolean; errors: string[] }
```

## FlowExecutor

### Constructor

```typescript
new FlowExecutor(options?: ExecutionOptions)
```

**Options:**
- `verbose` (boolean) - Enable verbose logging
- `timeout` (number) - Maximum execution time in milliseconds
- `continueOnError` (boolean) - Continue execution on step failure
- `parallel` (boolean) - Parallel execution when possible

### Methods

#### execute(workflow)

Execute a workflow.

```typescript
async execute(workflow: Workflow): Promise<WorkflowResult>
```

## FlowValidator

### Methods

#### validate(workflow)

Validate a complete workflow.

```typescript
validate(workflow: Workflow): ValidationResult
```

#### validateStep(step, allSteps)

Validate a single workflow step.

```typescript
validateStep(step: WorkflowStep, allSteps: WorkflowStep[]): ValidationResult
```

#### canExecute(workflow)

Check if workflow is executable.

```typescript
canExecute(workflow: Workflow): { executable: boolean; reason?: string }
```

## Type Definitions

### Workflow

```typescript
interface Workflow {
  id: string
  name: string
  description?: string
  steps: WorkflowStep[]
  execute(): Promise<WorkflowResult>
}
```

### WorkflowStep

```typescript
interface WorkflowStep {
  id: string
  type: 'analysis' | 'fix' | 'test' | 'deploy' | 'custom'
  name: string
  config: Record<string, any>
  dependencies: string[]
}
```

### WorkflowResult

```typescript
interface WorkflowResult {
  success: boolean
  stepResults: Map<string, StepResult>
  duration: number
  errors: Error[]
}
```
