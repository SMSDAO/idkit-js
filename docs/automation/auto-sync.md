# Auto Sync Utility

The Auto Sync utility keeps your code synchronized across different environments and branches.

## Overview

Auto Sync provides:
- Automatic file synchronization
- Conflict detection and resolution
- Branch synchronization
- Remote repository sync

## Usage

```typescript
import { AutoSync } from './automation/auto-sync'

const sync = new AutoSync({
  remote: 'origin',
  branch: 'main',
  autoResolve: true
})

// Sync with remote
await sync.syncWithRemote()

// Sync files
await sync.syncFiles(['src/', 'packages/'])

// Check sync status
const status = await sync.getStatus()
console.log(`Files out of sync: ${status.outOfSync.length}`)
```

## Configuration

Configure Auto Sync in your `aicode.config.ts`:

```typescript
automation: {
  autoSync: true
}
```

## Features

### Automatic Conflict Resolution

Auto Sync can automatically resolve common conflicts:
- Formatting differences
- Import order changes
- Whitespace differences

### Branch Synchronization

Keep multiple branches in sync:

```typescript
await sync.syncBranches(['main', 'develop'])
```

### Selective Sync

Sync only specific files or directories:

```typescript
await sync.syncFiles(['packages/core'], {
  exclude: ['*.test.ts']
})
```

## API Reference

See [Automation API](../api/automation.md) for complete API documentation.
