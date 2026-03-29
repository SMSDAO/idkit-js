# Auto Comments

The Auto Comments utility generates intelligent code comments and documentation.

## Overview

Auto Comments can:
- Generate JSDoc comments
- Add inline explanations
- Update outdated comments
- Suggest code improvements

## Usage

```typescript
import { AutoComments } from './automation/auto-comments'

const comments = new AutoComments({
  style: 'jsdoc',
  includeExamples: true
})

// Generate comments for all files
await comments.generateAll('src/')

// Generate for specific file
await comments.generateForFile('src/service.ts')

// Get suggestions
const suggestions = await comments.generateSuggestions('src/')
```

## Configuration

```typescript
{
  style: 'jsdoc',        // 'jsdoc', 'inline', or 'block'
  includeExamples: true,
  verbose: true
}
```

## Features

### JSDoc Generation

Automatically generates comprehensive JSDoc comments:

```typescript
/**
 * Calculate user statistics
 * @param userId - User identifier
 * @param options - Calculation options
 * @returns User statistics object
 */
function calculateStats(userId: string, options: Options): Stats {
  // implementation
}
```

### Inline Comments

Adds explanatory inline comments:

```typescript
// Validate user input before processing
if (!isValid(input)) {
  // Log validation failure for debugging
  logger.error('Invalid input received')
  return null
}
```

## API Reference

See [Automation API](../api/automation.md) for complete API documentation.
