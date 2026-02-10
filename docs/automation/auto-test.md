# Auto Test Utility

The Auto Test utility automatically generates and executes tests for your codebase.

## Overview

Auto Test provides:
- Automatic test generation
- Test execution
- Coverage reporting
- Test optimization

## Usage

```typescript
import { AutoTest } from './automation/auto-test'

const test = new AutoTest({
  coverage: true,
  watch: false
})

// Run all tests
const result = await test.runAll()

// Generate tests
await test.generateTests('src/service.ts')

// Run specific tests
await test.runTests(['**/*.test.ts'])

console.log(`Passed: ${result.passed}`)
console.log(`Failed: ${result.failed}`)
console.log(`Coverage: ${result.coverage}%`)
```

## Test Generation

Auto Test can generate tests for untested code:

```typescript
// Generate tests for a file
await test.generateTests('src/utils.ts')

// Generate tests for all untested files
await test.generateMissingTests()
```

## Test Execution

### Run All Tests

```typescript
const result = await test.runAll()
```

### Run Specific Tests

```typescript
await test.runTests(['packages/core/**/*.test.ts'])
```

### Watch Mode

```typescript
const test = new AutoTest({ watch: true })
await test.runAll()
```

## Coverage Reporting

```typescript
const test = new AutoTest({ coverage: true })
const result = await test.runAll()

console.log(`Line Coverage: ${result.coverage.lines}%`)
console.log(`Branch Coverage: ${result.coverage.branches}%`)
console.log(`Function Coverage: ${result.coverage.functions}%`)
```

## Test Optimization

Auto Test can optimize slow tests:

```typescript
// Find slow tests
const slowTests = await test.findSlowTests()

// Optimize tests
await test.optimizeTests(slowTests)
```

## Integration with CI/CD

```yaml
# .github/workflows/test.yml
- name: Run Auto Test
  run: pnpm aicode test --coverage
```

## API Reference

See [Automation API](../api/automation.md) for complete API documentation.
