<template>
  <div v-if="show && type === 'info'">
    <BaseAlertInfo @dismiss="dismiss"><slot /></BaseAlertInfo>
  </div>

  <div v-if="show && type === 'warning'">
    <BaseAlertWarning @dismiss="dismiss"><slot /></BaseAlertWarning>
  </div>
</template>

<script setup>
import BaseAlertInfo from '@/components/shared/BaseAlertInfo.vue'
import BaseAlertWarning from '@/components/shared/BaseAlertWarning.vue'
import LocalStorage from '@/utils/LocalStorage'

const props = defineProps(['storageId', 'type'])

const show = ref(!LocalStorage.getItem(props.storageId))

function dismiss() {
  LocalStorage.setItem(props.storageId, true)
  show.value = false
}
</script>
