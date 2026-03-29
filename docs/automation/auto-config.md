# Auto Config Utility

The Auto Config utility manages configuration files and environment settings automatically.

## Overview

Auto Config provides:
- Automatic configuration generation
- Environment-specific configs
- Configuration validation
- Configuration migration

## Usage

```typescript
import { AutoConfig } from './automation/auto-config'

const config = new AutoConfig({
  environments: ['development', 'staging', 'production']
})

// Generate configuration
await config.generate()

// Validate configuration
const validation = await config.validate()

// Migrate configuration
await config.migrate('2.0.0')
```

## Configuration Templates

Auto Config uses templates for different environments:

```typescript
// Development
{
  debug: true,
  logLevel: 'verbose',
  apiUrl: 'http://localhost:3000'
}

// Production
{
  debug: false,
  logLevel: 'error',
  apiUrl: 'https://api.production.com'
}
```

## Features

### Configuration Generation

Generate configuration files automatically:

```bash
pnpm aicode config generate
```

### Environment Management

Switch between environments:

```typescript
await config.setEnvironment('production')
```

### Configuration Validation

Validate against schemas:

```typescript
const isValid = await config.validate()
```

## API Reference

See [Automation API](../api/automation.md) for complete API documentation.
