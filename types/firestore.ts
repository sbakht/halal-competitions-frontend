import type { Timestamp } from 'firebase/firestore'
import type { CounterId } from '@/data'

export type LoggerMap = Record<CounterId, number>

export interface UserDoc {
  userid: string
  username: string
}

export interface LoggerDoc {
  username: string
  userid: string
  loggers: LoggerMap
  created: Timestamp
  lastUpdated: Timestamp
}
