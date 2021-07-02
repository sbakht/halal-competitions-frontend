<script>
const DEBOUNCE_RATE = 2000;

export default {
  data() {
    return {
      timeout: null,
      drag: null,
    };
  },
  methods: {
    onClick(data) {
      console.log(this.drag);
      if (!this.drag) {
        clearTimeout(this.timeout);
        this.$store.dispatch("increment", data);
        this.timeout = setTimeout(() => {
          this.$store.dispatch("save");
        }, DEBOUNCE_RATE);
      }
    },
    mousedown() {
      console.log("down");
      this.drag = true;
    },
    mouseup() {
      console.log("up");
      this.drag = false;
    },
  },
  render() {
    return this.$scopedSlots.default({
      incrementFn: this.onClick,
      mousedown: this.mousedown,
      mouseup: this.mouseup,
    });
  },
};
</script>