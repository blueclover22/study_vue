<template>
  <div align="right">
    <div v-if="isAuthorized">
      <span>{{ myinfo.userName }}님 환영합니다.</span>

      <button @click="logout">LOG OUT</button>
    </div>
    <div v-else>
      <router-link :to="{ name: 'SigninRouter' }">LOG IN</router-link>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'
import router from '@/router/router'

export default {
  name: 'MainHeader',

  setup() {
    const isAuthorized = inject('isAuthorized')
    const myinfo = inject('myinfo')
    const signout = inject('signout')

    const logout = () => {
      signout()
      alert('로그아웃')
      router.push({ name: 'HomeRouter' })
    }

    return {
      isAuthorized,
      myinfo,
      logout,
    }
  },
}
</script>
