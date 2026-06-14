<script setup lang="ts">
const { logout } = useAuth()

await logout()
await navigateTo('/')
</script>
