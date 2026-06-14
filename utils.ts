import { Timestamp } from 'firebase/firestore'
import type { DateRange } from '@/types/competition'

export function addDays(date: Date, days: number): Date {
  const next = new Date(date.valueOf())
  next.setDate(next.getDate() + days)
  return next
}

export function formatDate(date: Date): string {
  const mm = date.getMonth() + 1
  const dd = date.getDate()

  return [
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd,
    date.getFullYear(),
  ].join('/')
}

export function groupBy<T extends Record<string, unknown>>(
  arr: T[],
  key: keyof T & string,
): Record<string, T[]> {
  if (!arr.length) {
    return {}
  }

  const obj: Record<string, T[]> = {}
  try {
    arr.forEach((item) => {
      const val = String(item[key])
      if (!obj[val]) {
        obj[val] = []
      }
      obj[val].push(item)
    })
    return obj
  } catch (e) {
    console.error(e)
    return {}
  }
}

function startOfCurrentWeek(): Date {
  const currentDate = Timestamp.now().toDate()
  const monday = new Date(
    new Date(
      currentDate.setDate(
        currentDate.getDate() - ((currentDate.getDay() + 6) % 7),
      ),
    ).setHours(0, 0, 0, 0),
  )
  return monday
}

export function dateRange(): DateRange {
  const monday = startOfCurrentWeek()
  return { start: monday, end: addDays(monday, 7) }
}

export function dateRangeLastWeek(): DateRange {
  const monday = startOfCurrentWeek()
  return { start: addDays(monday, -7), end: monday }
}

export function mapObj<T extends Record<string, unknown>, R>(
  obj: T,
  cb: (key: string, val: T[keyof T]) => R,
): R[] {
  return (Object.keys(obj) as (keyof T)[]).map(key => cb(String(key), obj[key]))
}
