<script setup>
const userStore = useUserStore()

await userStore.logout()
await navigateTo('/')
</script>
