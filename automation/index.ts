/**
 * Automation Utilities
 * 
 * Entry point for all automation modules
 */

export { AutoSync } from './auto-sync'
export type { AutoSyncConfig, SyncStatus, SyncResult } from './auto-sync'

export { AutoConfig } from './auto-config'
export type { AutoConfigOptions, ConfigTemplate, ValidationResult } from './auto-config'

export { AutoRepair } from './auto-repair'
export type { AutoRepairConfig, RepairResult, RepairItem } from './auto-repair'

export { AutoFix } from './auto-fix'
export type { AutoFixConfig, FixResult, FixedIssue } from './auto-fix'

export { AutoTest } from './auto-test'
export type { AutoTestConfig, TestResult, CoverageReport, TestDetail } from './auto-test'

export { AutoComments } from './auto-comments'
export type { AutoCommentsConfig, CommentResult } from './auto-comments'

export * from './deploy'
