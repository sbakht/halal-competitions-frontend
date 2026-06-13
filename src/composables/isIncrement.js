import { useLoggerStore } from '@/stores/logger'

const DEBOUNCE_RATE = 2000;

export default function isIncrement() {
  let timeout = null;

  const loggerStore = useLoggerStore()

  function increment(data) {
    clearTimeout(timeout);
    loggerStore.increment(data);
    timeout = setTimeout(() => {
      loggerStore.save();
    }, DEBOUNCE_RATE);
  }

  return {
    increment
  }
}
