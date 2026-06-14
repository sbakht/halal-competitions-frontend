import type { CompetitionId } from '@/types/competition'

export interface LocalStorageItem<T> {
  name: string
  defaultVal: T
  get(): T
  set(val: T): void
}

export interface LocalStorageAPI {
  incrementCount: LocalStorageItem<number>
  language: LocalStorageItem<string[]>
  activeTabId: LocalStorageItem<CompetitionId>
  carouselMode: LocalStorageItem<boolean>
  setItem(str: string, val: string): void
  getItem(str: string): string | null
}
