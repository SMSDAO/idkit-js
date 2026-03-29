# AiCode KIT World Apps

This directory contains the AiCode KIT World Apps architecture for IDKit-JS, providing an intelligent automation and development framework.

## Architecture Overview

The AiCode KIT is designed to enhance the IDKit development workflow with AI-powered automation tools and intelligent code management.

### Directory Structure

```
app/
├── core/           # Core AiCode modules and utilities
├── flow/           # Flow app builder components
├── config/         # Configuration files and schemas
└── README.md       # This file
```

## Core Modules

The `core/` directory contains fundamental AiCode modules that power the automation system:

- **ai-engine.ts** - AI processing engine for code analysis
- **context-manager.ts** - Context management for AI operations
- **code-analyzer.ts** - Static code analysis utilities
- **pattern-detector.ts** - Pattern recognition for code improvements

## Flow Builder

The `flow/` directory provides components for building automated workflows:

- **workflow-builder.ts** - Visual workflow construction
- **action-nodes.ts** - Individual workflow action nodes
- **flow-executor.ts** - Workflow execution engine
- **flow-validators.ts** - Workflow validation utilities

## Configuration

The `config/` directory contains configuration schemas and templates:

- **aicode.config.ts** - Main AiCode configuration
- **flow.schema.json** - Flow definition schema
- **rules.config.ts** - Code analysis rules

## Usage

To use the AiCode KIT in your development workflow:

```typescript
import { AiEngine } from './app/core/ai-engine'
import { WorkflowBuilder } from './app/flow/workflow-builder'

// Initialize the AI engine
const engine = new AiEngine()

// Create a workflow
const workflow = new WorkflowBuilder()
  .addAnalysisStep()
  .addAutoFixStep()
  .build()

// Execute the workflow
await workflow.execute()
```

## Integration with IDKit

The AiCode KIT seamlessly integrates with the existing IDKit packages:

- Enhances code quality in `packages/core`
- Automates testing for `packages/react`
- Optimizes builds for `packages/standalone`

## Development

To develop AiCode KIT modules locally:

```bash
# Install dependencies
pnpm install

# Build AiCode modules
pnpm build

# Run in development mode
pnpm dev
```

## Contributing

Contributions to the AiCode KIT are welcome! Please follow the project's contribution guidelines and ensure all new modules include comprehensive documentation.
