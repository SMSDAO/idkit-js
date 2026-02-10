/**
 * ContextManager - Manages context for AI operations
 * 
 * This module handles context gathering, storage, and retrieval for AI-powered
 * code analysis and automation tasks.
 */

export interface Context {
	/** Unique context identifier */
	id: string
	/** Context type */
	type: 'file' | 'project' | 'workspace'
	/** Context data */
	data: Record<string, any>
	/** Creation timestamp */
	createdAt: Date
	/** Last updated timestamp */
	updatedAt: Date
}

export interface ContextQuery {
	/** Context type filter */
	type?: Context['type']
	/** Search keywords */
	keywords?: string[]
	/** Maximum age in milliseconds */
	maxAge?: number
}

export class ContextManager {
	private contexts: Map<string, Context>
	private maxContexts: number

	constructor(maxContexts: number = 1000) {
		this.contexts = new Map()
		this.maxContexts = maxContexts
	}

	/**
	 * Create a new context
	 */
	create(type: Context['type'], data: Record<string, any>): Context {
		const context: Context = {
			id: this.generateId(),
			type,
			data,
			createdAt: new Date(),
			updatedAt: new Date(),
		}

		this.contexts.set(context.id, context)
		this.enforceMaxContexts()

		return context
	}

	/**
	 * Get a context by ID
	 */
	get(id: string): Context | undefined {
		return this.contexts.get(id)
	}

	/**
	 * Update an existing context
	 */
	update(id: string, data: Partial<Record<string, any>>): Context | undefined {
		const context = this.contexts.get(id)
		if (!context) return undefined

		context.data = { ...context.data, ...data }
		context.updatedAt = new Date()

		return context
	}

	/**
	 * Query contexts based on filters
	 */
	query(query: ContextQuery): Context[] {
		let results = Array.from(this.contexts.values())

		if (query.type) {
			results = results.filter(ctx => ctx.type === query.type)
		}

		if (query.maxAge) {
			const cutoff = Date.now() - query.maxAge
			results = results.filter(ctx => ctx.updatedAt.getTime() > cutoff)
		}

		if (query.keywords && query.keywords.length > 0) {
			results = results.filter(ctx => {
				const contextStr = JSON.stringify(ctx.data).toLowerCase()
				return query.keywords!.some(keyword => contextStr.includes(keyword.toLowerCase()))
			})
		}

		return results
	}

	/**
	 * Delete a context
	 */
	delete(id: string): boolean {
		return this.contexts.delete(id)
	}

	/**
	 * Clear all contexts
	 */
	clear(): void {
		this.contexts.clear()
	}

	/**
	 * Get context statistics
	 */
	getStats(): { total: number; byType: Record<string, number> } {
		const byType: Record<string, number> = {}

		for (const context of this.contexts.values()) {
			byType[context.type] = (byType[context.type] || 0) + 1
		}

		return {
			total: this.contexts.size,
			byType,
		}
	}

	/**
	 * Enforce maximum context limit
	 */
	private enforceMaxContexts(): void {
		if (this.contexts.size <= this.maxContexts) return

		// Remove oldest contexts
		const sorted = Array.from(this.contexts.entries()).sort((a, b) => {
			return a[1].updatedAt.getTime() - b[1].updatedAt.getTime()
		})

		const toRemove = sorted.slice(0, this.contexts.size - this.maxContexts)
		for (const [id] of toRemove) {
			this.contexts.delete(id)
		}
	}

	/**
	 * Generate a unique context ID
	 */
	private generateId(): string {
		return `ctx_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
	}
}
