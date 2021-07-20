import { useStore } from 'vuex'


const DEBOUNCE_RATE = 2000;

export default function isIncrement() {
  let timeout = null;

  const store = useStore()

  function increment(data) {
    clearTimeout(timeout);
    store.dispatch("Logger/increment", data);
    timeout = setTimeout(() => {
      store.dispatch("Logger/save");
    }, DEBOUNCE_RATE);
  }

  return {
    increment
  }
}