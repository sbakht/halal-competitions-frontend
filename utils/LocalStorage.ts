import type { CompetitionId } from '@/types/competition'
import type { LocalStorageAPI, LocalStorageItem } from '@/types/localStorage'

type StorageKey = 'incrementCount' | 'language' | 'activeTabId' | 'carouselMode'

interface StorageConfig<T> {
  name: string
  defaultVal: T
  type: NumberConstructor | StringConstructor | BooleanConstructor | ArrayConstructor
  min?: number
  max?: number
}

const configs: Record<StorageKey, StorageConfig<unknown>> = {
  incrementCount: {
    name: 'increment-count',
    defaultVal: 1,
    type: Number,
    min: 1,
    max: 100,
  },
  language: {
    name: 'language',
    defaultVal: ['english', 'arabic'],
    type: Array,
  },
  activeTabId: {
    name: 'activeTabId',
    defaultVal: 'dhikr',
    type: String,
  },
  carouselMode: {
    name: 'carousel-mode',
    defaultVal: false,
    type: Boolean,
  },
}

function getValue<T>(config: StorageConfig<T>): T {
  const stored = window.localStorage.getItem(config.name)
  const val = (stored ?? config.defaultVal) as T

  if (stored === null || stored === String(config.defaultVal)) {
    return config.defaultVal
  }

  if (config.type === Number) {
    const parsed = Number.parseInt(stored)
    if (Number.isNaN(parsed)) {
      return config.defaultVal
    }
    if (config.min !== undefined && config.max !== undefined) {
      return Math.min(config.max, Math.max(config.min, parsed)) as T
    }
    return parsed as T
  }

  if (config.type === Array) {
    return stored.split(',') as T
  }

  if (config.type === Boolean) {
    return (stored === 'true') as T
  }

  return val
}

function setValue<T>(config: StorageConfig<T>, val: T): void {
  window.localStorage.setItem(config.name, String(val))
}

function createItem<T>(config: StorageConfig<T>): LocalStorageItem<T> {
  return {
    name: config.name,
    defaultVal: config.defaultVal,
    get: () => getValue(config),
    set: (val: T) => setValue(config, val),
  }
}

const LocalStorage: LocalStorageAPI = {
  incrementCount: createItem(configs.incrementCount as StorageConfig<number>),
  language: createItem(configs.language as StorageConfig<string[]>),
  activeTabId: createItem(configs.activeTabId as StorageConfig<CompetitionId>),
  carouselMode: createItem(configs.carouselMode as StorageConfig<boolean>),
  setItem(str: string, val: string) {
    window.localStorage.setItem(str, val)
  },
  getItem(str: string) {
    return window.localStorage.getItem(str)
  },
}

export default LocalStorage
