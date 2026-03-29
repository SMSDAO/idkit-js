# Troubleshooting Guide

Common issues and solutions for AiCode KIT.

## Installation Issues

### pnpm install fails

**Problem:** Dependencies fail to install

**Solution:**
```bash
# Clear pnpm cache
pnpm store prune

# Remove node_modules and lockfile
rm -rf node_modules pnpm-lock.yaml

# Reinstall
pnpm install
```

### Build errors

**Problem:** TypeScript compilation errors

**Solution:**
```bash
# Clean build
rm -rf build dist

# Rebuild
pnpm build
```

## Runtime Issues

### AiEngine analysis hangs

**Problem:** Analysis takes too long or hangs

**Solution:**
- Increase timeout: `{ timeout: 60000 }`
- Reduce max depth: `{ maxDepth: 5 }`
- Exclude large directories: `exclude: ['node_modules', 'build']`

### Memory issues

**Problem:** Out of memory errors

**Solution:**
```bash
# Increase Node.js memory
NODE_OPTIONS="--max-old-space-size=4096" pnpm aicode:run
```

## Configuration Issues

### Config file not found

**Problem:** Cannot load aicode.config.ts

**Solution:**
- Ensure file exists in project root
- Check file permissions
- Validate TypeScript syntax

## Workflow Issues

### Workflow execution fails

**Problem:** Steps fail to execute

**Solution:**
- Check dependencies are met
- Validate workflow structure
- Enable verbose logging: `{ verbose: true }`

## Deployment Issues

### Vercel deployment fails

**Problem:** Deployment to Vercel fails

**Solution:**
- Verify VERCEL_TOKEN is set
- Check project configuration
- Ensure build succeeds locally

## Getting Help

If you continue to experience issues:

1. Check the [GitHub Issues](https://github.com/SMSDAO/idkit-js/issues)
2. Review the [documentation](../README.md)
3. Open a new issue with:
   - Error message
   - Steps to reproduce
   - Environment details
