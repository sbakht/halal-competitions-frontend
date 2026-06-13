<template>
  <div v-if="show && type === 'info'">
    <BaseAlertInfo @dismiss="dismiss"><slot /></BaseAlertInfo>
  </div>

  <div v-if="show && type === 'warning'">
    <BaseAlertWarning @dismiss="dismiss"><slot /></BaseAlertWarning>
  </div>
</template>

<script>
import BaseAlertInfo from "@/components/shared/BaseAlertInfo.vue";
import BaseAlertWarning from "@/components/shared/BaseAlertWarning.vue";
import LocalStorage from '../../utils/LocalStorage'

export default {
  components: {
    BaseAlertInfo,
    BaseAlertWarning,
  },
  props: ["storageId", "type"],
  data() {
    return {
      show: !LocalStorage.getItem(this.storageId),
    };
  },
  methods: {
    dismiss() {
      LocalStorage.setItem(this.storageId, true);
      this.show = false;
    },
  },
};
</script>

<style>
</style>