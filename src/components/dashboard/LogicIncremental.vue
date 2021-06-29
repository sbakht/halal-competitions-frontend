<script>
const DEBOUNCE_RATE = 2000;

export default {
  data() {
    return {
      timeout: null,
    };
  },
  methods: {
    onClick(data) {
      clearTimeout(this.timeout);
      this.$store.dispatch("increment", data);
      this.timeout = setTimeout(() => {
        this.$store.dispatch("save");
      }, DEBOUNCE_RATE);
    },
  },
  render() {
    return this.$scopedSlots.default({
      incrementFn: this.onClick,
    });
  },
};
</script>