# Auto Repair Utility

The Auto Repair utility automatically detects and repairs common code issues.

## Overview

Auto Repair provides:
- Automatic issue detection
- Common issue repair
- Backup before repair
- Repair verification

## Usage

```typescript
import { AutoRepair } from './automation/auto-repair'

const repair = new AutoRepair({
  backup: true,
  verify: true
})

// Repair all issues
const result = await repair.repairAll('packages/')

// Repair specific issues
await repair.repairIssues(['missing-semicolon', 'unused-imports'])

console.log(`Repaired: ${result.repaired.length}`)
console.log(`Failed: ${result.failed.length}`)
```

## Supported Repairs

### Code Style Issues
- Missing semicolons
- Incorrect indentation
- Trailing whitespace
- Line ending normalization

### Import Issues
- Unused imports
- Missing imports
- Duplicate imports
- Import order

### Type Issues
- Missing type annotations
- Incorrect types
- Type casting issues

### Common Bugs
- Undefined variable usage
- Null pointer issues
- Resource leaks

## Configuration

```typescript
automation: {
  autoRepair: true
}
```

## Safety Features

### Backup System

Auto Repair creates backups before making changes:

```typescript
const repair = new AutoRepair({ backup: true })
await repair.repairAll('src/')

// Restore from backup if needed
await repair.restore()
```

### Verification

Verify repairs don't break functionality:

```typescript
const repair = new AutoRepair({ verify: true })
const result = await repair.repairAll('src/')

if (!result.verified) {
  await repair.restore()
}
```

## API Reference

See [Automation API](../api/automation.md) for complete API documentation.
