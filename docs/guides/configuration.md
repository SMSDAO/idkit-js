# Configuration Guide

Complete guide to configuring AiCode KIT.

## Configuration File

Create `aicode.config.ts` in your project root:

```typescript
import { AiCodeConfig } from './app/config'

const config: AiCodeConfig = {
  projectName: 'My Project',
  rootDir: '.',
  sourceDirs: ['src', 'packages'],
  exclude: ['node_modules', 'build', 'dist'],
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

## Configuration Options

### Project Settings

- `projectName`: Project name
- `rootDir`: Project root directory
- `sourceDirs`: Directories to analyze
- `exclude`: Patterns to exclude

### Analysis Settings

- `enabled`: Enable analysis
- `maxDepth`: Maximum directory depth
- `timeout`: Analysis timeout (ms)
- `detectPatterns`: Enable pattern detection
- `analyzeComplexity`: Enable complexity analysis

### Automation Settings

- `autoSync`: Enable auto-sync
- `autoConfig`: Enable auto-config
- `autoRepair`: Enable auto-repair
- `autoFix`: Enable auto-fix
- `autoTest`: Enable auto-test
- `autoComments`: Enable auto-comments

### Flow Settings

- `enabled`: Enable workflows
- `timeout`: Workflow timeout (ms)
- `parallel`: Enable parallel execution
- `continueOnError`: Continue on step failure

## Environment-Specific Config

Create environment-specific configurations:

```typescript
const config: AiCodeConfig = {
  // Common settings
  ...baseConfig,
  
  // Environment-specific overrides
  ...(process.env.NODE_ENV === 'production' ? {
    automation: {
      ...baseConfig.automation,
      autoFix: false  // Disable auto-fix in production
    }
  } : {})
}
```

## Validation

Validate your configuration:

```typescript
import { validateConfig } from './app/config'

const validation = validateConfig(config)

if (!validation.valid) {
  console.error('Invalid configuration:', validation.errors)
}
```

## Loading Configuration

Load configuration programmatically:

```typescript
import { loadConfig } from './app/config'

const config = loadConfig('./aicode.config.ts')
```

## Best Practices

1. **Keep it simple**: Start with defaults and adjust as needed
2. **Use environment variables**: For sensitive data
3. **Validate configuration**: Before running workflows
4. **Document custom settings**: For team members
