import type { ActiveLogger } from '@/types/competition'

const DEBOUNCE_RATE = 2000

export default function isIncrement() {
  let timeout: ReturnType<typeof setTimeout> | null = null

  const loggerStore = useLoggerStore()

  function increment(data: ActiveLogger) {
    if (timeout) {
      clearTimeout(timeout)
    }
    loggerStore.increment(data)
    timeout = setTimeout(() => {
      loggerStore.save()
    }, DEBOUNCE_RATE)
  }

  return {
    increment,
  }
}
