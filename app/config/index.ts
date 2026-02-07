/**
 * AiCode KIT Configuration
 * 
 * Entry point for all configuration modules
 */

export { defaultConfig, loadConfig, mergeConfig, validateConfig } from './aicode.config'
export type { AiCodeConfig, AnalysisConfig, AutomationConfig, FlowConfig } from './aicode.config'

export { defaultRules, getEnabledRules, getRulesByCategory, getRulesBySeverity } from './rules.config'
export type { AnalysisRule, RulesConfig } from './rules.config'
