<template>
  <router-view name="header" />
  <router-view name="menu" />
  <router-view />
  <router-view name="footer" />
</template>

<script>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'App',
  setup() {
    const authStore = useAuthStore()

    onMounted(async () => {
      // Auth 스토어의 초기화 메서드 사용
      try {
        await authStore.initializeAuth()
        console.log('Auth initialized')
      } catch (error) {
        console.log('Auth initialization failed:', error)
      }
    })
  },
}
</script>
