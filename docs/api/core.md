# Core API Reference

Complete API reference for AiCode KIT core modules.

## AiEngine

### Constructor

```typescript
new AiEngine(config?: AiEngineConfig)
```

**Parameters:**
- `config.verbose` (boolean, optional) - Enable verbose logging
- `config.maxDepth` (number, optional) - Maximum analysis depth (default: 10)
- `config.timeout` (number, optional) - Analysis timeout in milliseconds (default: 30000)

### Methods

#### analyze(target)

Analyze a codebase or specific files.

```typescript
async analyze(target: string | string[]): Promise<AnalysisResult>
```

**Returns:** Promise<AnalysisResult>
- `score` (number) - Health score (0-100)
- `issues` (Issue[]) - Detected issues
- `suggestions` (Suggestion[]) - Improvement suggestions
- `metadata` (AnalysisMetadata) - Analysis metadata

#### suggest(context)

Generate code suggestions based on context.

```typescript
async suggest(context: string): Promise<Suggestion[]>
```

## ContextManager

### Constructor

```typescript
new ContextManager(maxContexts?: number)
```

### Methods

#### create(type, data)

Create a new context.

```typescript
create(type: 'file' | 'project' | 'workspace', data: Record<string, any>): Context
```

#### get(id)

Get a context by ID.

```typescript
get(id: string): Context | undefined
```

#### query(query)

Query contexts based on filters.

```typescript
query(query: ContextQuery): Context[]
```

## CodeAnalyzer

### Methods

#### analyzeFile(filePath)

Analyze a file.

```typescript
async analyzeFile(filePath: string): Promise<CodeAnalysisResult>
```

#### analyzeCode(code, language)

Analyze code string.

```typescript
async analyzeCode(code: string, language?: string): Promise<CodeMetrics>
```

#### calculateComplexity(code)

Calculate cyclomatic complexity.

```typescript
calculateComplexity(code: string): number
```

#### extractDependencies(code)

Extract dependencies from code.

```typescript
extractDependencies(code: string): string[]
```

## PatternDetector

### Methods

#### detect(code, filePath)

Detect patterns in code.

```typescript
detect(code: string, filePath?: string): PatternMatch[]
```

#### registerPattern(pattern)

Register a custom pattern.

```typescript
registerPattern(pattern: Pattern): void
```

#### getPatterns()

Get all registered patterns.

```typescript
getPatterns(): Pattern[]
```

## Type Definitions

### AnalysisResult

```typescript
interface AnalysisResult {
  score: number
  issues: Issue[]
  suggestions: Suggestion[]
  metadata: AnalysisMetadata
}
```

### Issue

```typescript
interface Issue {
  severity: 'critical' | 'warning' | 'info'
  message: string
  file?: string
  line?: number
  category: string
}
```

### CodeMetrics

```typescript
interface CodeMetrics {
  loc: number
  complexity: number
  maintainability: number
  dependencies: number
  coverage?: number
}
```
