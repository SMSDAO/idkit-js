# Installation Guide

Complete installation instructions for AiCode KIT.

## Prerequisites

- Node.js 18 or higher
- pnpm 9.12.2 or higher
- Git

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/SMSDAO/idkit-js.git
cd idkit-js
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Build the Project

```bash
pnpm build
```

### 4. Verify Installation

```bash
# Run tests
pnpm test

# Start development servers
pnpm dev
```

## Configuration

### Basic Configuration

Create `aicode.config.ts` in your project root:

```typescript
import { AiCodeConfig } from './app/config'

const config: AiCodeConfig = {
  projectName: 'IDKit',
  rootDir: '.',
  sourceDirs: ['packages', 'app'],
  exclude: ['node_modules', 'build'],
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

## IDE Setup

### VS Code

Install recommended extensions:
- ESLint
- Prettier
- TypeScript

### WebStorm

Enable TypeScript support and ESLint integration.

## Troubleshooting

See the [Troubleshooting Guide](./troubleshooting.md) for common issues.
