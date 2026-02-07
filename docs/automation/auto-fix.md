# Auto Fix Utility

The Auto Fix utility automatically fixes detected issues in your codebase.

## Overview

Auto Fix provides:
- Automatic issue fixing
- Code refactoring
- Performance optimization
- Security fix application

## Usage

```typescript
import { AutoFix } from './automation/auto-fix'

const fix = new AutoFix({
  dryRun: false,
  backup: true
})

// Fix all issues
const result = await fix.fixAll('packages/')

// Fix specific categories
await fix.fixCategory('security')
await fix.fixCategory('performance')

console.log(`Fixed: ${result.fixed}`)
console.log(`Skipped: ${result.skipped}`)
```

## Fix Categories

### Security Fixes
- SQL injection prevention
- XSS vulnerability fixes
- CSRF protection
- Input sanitization

### Performance Fixes
- Loop optimization
- Memory leak fixes
- Caching improvements
- Bundle size reduction

### Code Quality Fixes
- Complexity reduction
- Code duplication removal
- Dead code elimination
- Naming improvements

## Dry Run Mode

Test fixes without applying them:

```typescript
const fix = new AutoFix({ dryRun: true })
const result = await fix.fixAll('src/')

console.log('Would fix:', result.issues)
```

## Selective Fixing

Fix only specific issues:

```typescript
// Fix only high severity issues
await fix.fixBySeverity('critical')

// Fix specific issue types
await fix.fixTypes(['sql-injection', 'xss'])
```

## Integration with Workflows

```typescript
import { WorkflowBuilder } from './app/flow'

const workflow = new WorkflowBuilder('Fix and Test')
  .addAnalysisStep()
  .addAutoFixStep({ categories: ['security', 'performance'] })
  .addTestStep()
  .build()
```

## API Reference

See [Automation API](../api/automation.md) for complete API documentation.
