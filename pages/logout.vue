<script setup>
const { logout } = useAuth()

await logout()
await navigateTo('/')
</script>
