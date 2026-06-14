import { competitionsJSON, competitionKeys, type CounterId } from '@/data'
import type { CompetitionId } from '@/types/competition'
import type { LoggerDoc, LoggerMap } from '@/types/firestore'

export interface ScoreEntry {
  username: string
  count: number
}

export interface LeaderboardRow {
  title: string
  users: ScoreEntry[]
}

export function getCountBy(user: LoggerDoc, competitionKey: CounterId): ScoreEntry {
  return { username: user.username, count: user.loggers[competitionKey] ?? 0 }
}

export function sortScores(scores: ScoreEntry[]): void {
  scores.sort((s1, s2) => (s1.count >= s2.count ? -1 : 1))
}

export function orderedLoggerByScore(
  competitionKey: CounterId,
  users: LoggerDoc[],
): ScoreEntry[] {
  const scores = users
    .map(user => getCountBy(user, competitionKey))
    .filter(user => user.count > 0)
  sortScores(scores)
  return scores
}

export function getKeysForCompetition(compId: CompetitionId): string[] {
  const comp = competitionsJSON.find(entry => entry.id === compId)
  return Object.keys(comp?.counters ?? {})
}

export function getTitleFromCounterId(id: CounterId): string {
  return competitionKeys[id].title
}

export function filterToActiveTab(
  loggers: Partial<Record<CounterId, ScoreEntry[]>>,
  activeTabId: CompetitionId,
): LeaderboardRow[] {
  const result: LeaderboardRow[] = []
  const activeKeys = getKeysForCompetition(activeTabId)
  Object.keys(loggers).forEach((key) => {
    const counterId = key as CounterId
    if (activeKeys.includes(counterId) && loggers[counterId]) {
      result.push({ title: getTitleFromCounterId(counterId), users: loggers[counterId]! })
    }
  })
  return result
}

export function getAllScores(racers: LoggerMap[]): Record<CounterId, number[]> {
  const loggerKeys = Object.keys(competitionKeys) as CounterId[]
  const result: Record<CounterId, number[]> = {} as Record<CounterId, number[]>
  loggerKeys.forEach((key) => {
    result[key] = racers.map(racer => racer[key] || 0)
  })
  return result
}

export function getNextHighestScore(
  count: number,
  scores: number[] | undefined,
): number | undefined {
  if (!scores) {
    return undefined
  }
  return [...scores].sort((a, b) => a - b).find(score => score > count)
}

export function sumScores(entries: ScoreEntry[]): number {
  return entries.reduce((accum, user) => accum + (user.count || 0), 0)
}
