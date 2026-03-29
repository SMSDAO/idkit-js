/**
 * AiCode KIT Core Modules
 * 
 * Entry point for all core AiCode modules
 */

export { AiEngine } from './ai-engine'
export type { AiEngineConfig, AnalysisResult, Issue, Suggestion, AnalysisMetadata } from './ai-engine'

export { ContextManager } from './context-manager'
export type { Context, ContextQuery } from './context-manager'

export { CodeAnalyzer } from './code-analyzer'
export type { CodeMetrics, DependencyInfo, CodeAnalysisResult } from './code-analyzer'

export { PatternDetector } from './pattern-detector'
export type { Pattern, PatternMatch } from './pattern-detector'
