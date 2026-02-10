# Deployment Guide

Deploy your IDKit applications using AiCode KIT automation.

## Overview

AiCode KIT provides automated deployment to:
- Vercel
- Netlify
- AWS
- Custom servers

## Vercel Deployment

### Automatic Deployment

```typescript
import { VercelDeployer } from './automation/deploy/vercel'

const deployer = new VercelDeployer({
  project: 'idkit-app',
  token: process.env.VERCEL_TOKEN
})

// Deploy to production
const deployment = await deployer.deploy({
  environment: 'production',
  buildDir: './build'
})

console.log(`Deployed to: ${deployment.url}`)
```

### Workflow Integration

```typescript
import { WorkflowBuilder } from './app/flow'

const workflow = new WorkflowBuilder('Deploy to Vercel')
  .addAnalysisStep()
  .addTestStep({ coverage: true })
  .addCustomStep('build', { command: 'pnpm build' })
  .addDeployStep({
    environment: 'production',
    provider: 'vercel'
  })
  .build()
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v4
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Run AiCode tests
        run: pnpm aicode test
      
      - name: Build
        run: pnpm build
      
      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        run: pnpm aicode deploy --production
```

## Environment Configuration

### Development

```typescript
{
  environment: 'development',
  apiUrl: 'http://localhost:3000',
  debug: true
}
```

### Staging

```typescript
{
  environment: 'staging',
  apiUrl: 'https://staging-api.example.com',
  debug: false
}
```

### Production

```typescript
{
  environment: 'production',
  apiUrl: 'https://api.example.com',
  debug: false
}
```

## Rollback

Rollback to a previous deployment:

```typescript
await deployer.rollback('deployment-id')
```

## Monitoring

Monitor deployment status:

```typescript
const status = await deployer.getStatus('deployment-id')
console.log(`Status: ${status.state}`)
console.log(`Health: ${status.health}`)
```

## Best Practices

1. Always run tests before deployment
2. Use staging environment for testing
3. Enable monitoring and alerts
4. Keep deployment logs
5. Have a rollback plan

## API Reference

See [Automation API](../api/automation.md) for complete API documentation.
