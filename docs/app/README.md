# App Architecture

The `app/` directory contains the AiCode KIT World Apps architecture, providing an intelligent automation and development framework for IDKit-JS.

## Directory Structure

```
app/
├── core/              # Core AiCode modules
│   ├── ai-engine.ts          # AI processing engine
│   ├── context-manager.ts    # Context management
│   ├── code-analyzer.ts      # Static code analysis
│   ├── pattern-detector.ts   # Pattern recognition
│   └── index.ts              # Core exports
├── flow/              # Flow app builder components
│   ├── workflow-builder.ts   # Workflow construction
│   ├── action-nodes.ts       # Individual action nodes
│   ├── flow-executor.ts      # Workflow execution
│   ├── flow-validators.ts    # Workflow validation
│   └── index.ts              # Flow exports
├── config/            # Configuration files
│   ├── aicode.config.ts      # Main configuration
│   ├── flow.schema.json      # Flow definition schema
│   ├── rules.config.ts       # Analysis rules
│   └── index.ts              # Config exports
├── index.ts           # Main entry point
└── README.md          # This documentation
```

## Core Modules

### AI Engine (`core/ai-engine.ts`)

The AI Engine provides foundational AI capabilities for code analysis and automation.

**Key Features:**
- Code analysis with health scoring
- Issue detection and classification
- Intelligent suggestions generation
- Configurable analysis depth and timeout

**Usage Example:**
```typescript
import { AiEngine } from './app/core/ai-engine'

const engine = new AiEngine({
  verbose: true,
  maxDepth: 10,
  timeout: 30000
})

const result = await engine.analyze(['src/', 'packages/'])
console.log(`Health Score: ${result.score}`)
console.log(`Issues Found: ${result.issues.length}`)
```

### Context Manager (`core/context-manager.ts`)

Manages context for AI operations, storing and retrieving context data across operations.

**Key Features:**
- Context creation and storage
- Query-based context retrieval
- Context lifecycle management
- Memory-efficient context handling

**Usage Example:**
```typescript
import { ContextManager } from './app/core/context-manager'

const manager = new ContextManager(1000)

// Create context
const ctx = manager.create('file', {
  path: 'src/index.ts',
  content: '...'
})

// Query contexts
const fileContexts = manager.query({ type: 'file' })
```

### Code Analyzer (`core/code-analyzer.ts`)

Provides comprehensive code analysis capabilities including complexity metrics and dependency analysis.

**Key Features:**
- Lines of code (LOC) calculation
- Cyclomatic complexity analysis
- Maintainability index computation
- Dependency extraction
- Pattern and anti-pattern detection

**Usage Example:**
```typescript
import { CodeAnalyzer } from './app/core/code-analyzer'

const analyzer = new CodeAnalyzer()

// Analyze a file
const result = await analyzer.analyzeFile('src/index.ts')

// Analyze code string
const metrics = await analyzer.analyzeCode(codeString, 'typescript')
console.log(`Complexity: ${metrics.complexity}`)
console.log(`Maintainability: ${metrics.maintainability}`)
```

### Pattern Detector (`core/pattern-detector.ts`)

Detects design patterns, best practices, and potential issues in code.

**Key Features:**
- Design pattern recognition (Singleton, Factory, Observer, etc.)
- Security vulnerability detection
- Performance issue identification
- Code smell detection

**Usage Example:**
```typescript
import { PatternDetector } from './app/core/pattern-detector'

const detector = new PatternDetector()

// Detect patterns in code
const matches = detector.detect(codeString, 'src/service.ts')

// Register custom pattern
detector.registerPattern({
  name: 'custom-pattern',
  description: 'My custom pattern',
  category: 'design',
  confidence: 0.8
})
```

## Integration with IDKit

The AiCode KIT integrates seamlessly with existing IDKit packages:

### Core Package Integration
- Analyzes `packages/core` for type safety and security
- Validates API endpoints and interfaces
- Ensures proper error handling

### React Package Integration
- Analyzes React components for best practices
- Validates hooks usage
- Checks for performance anti-patterns

### Standalone Package Integration
- Optimizes bundle size
- Validates browser compatibility
- Tests cross-browser functionality

## Configuration

The app modules can be configured through `app/config/aicode.config.ts`:

```typescript
import { loadConfig } from './app/config'

const config = loadConfig()

// Customize analysis
config.analysis.maxDepth = 15
config.analysis.detectPatterns = true

// Enable automation features
config.automation.autoFix = true
config.automation.autoTest = true
```

## Next Steps

- Learn about [Flow Builder](./flow-builder.md) for creating workflows
- Explore [Configuration System](./configuration.md) for customization
- Read the [Core API Reference](../api/core.md) for detailed API docs
