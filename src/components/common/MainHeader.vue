<template>
  <div align="right">
    <div v-if="authStore.isAuthorized">
      <span>{{ authStore.myinfo.userName }}님 환영합니다.</span>

      <button @click="logout">LOG OUT</button>
    </div>
    <div v-else>
      <router-link :to="{ name: 'SigninRouter' }">LOG IN</router-link>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import router from '@/router/router'

export default {
  name: 'MainHeader',

  setup() {
    const authStore = useAuthStore()

    const logout = () => {
      authStore.signout()
      alert('로그아웃')
      router.push({ name: 'HomeRouter' })
    }

    return {
      authStore,
      logout,
    }
  },
}
</script>
