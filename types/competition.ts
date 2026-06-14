export type CompetitionId = 'dhikr' | 'mindful' | 'charity' | 'fitness'

export interface CounterDefinition {
  title: string
}

export interface Competition {
  id: CompetitionId
  title: string
  counters: Record<string, CounterDefinition>
}

export interface CounterMeta {
  competition: CompetitionId
  title: string
  arabic?: string
}

export interface ActiveLogger {
  id: string
  title: string
  arabic?: string
  count: number
  target?: number
}

export interface DateRange {
  start: Date
  end: Date
}
