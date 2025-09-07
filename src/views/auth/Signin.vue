<template>
  <div align="center">
    <h2>Login</h2>
    <signin-form @sign-in="login" />
  </div>
</template>

<script>
import SigninForm from '@/components/auth/SigninForm.vue'
import router from '@/router/router'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'SigninComponent',
  components: {
    SigninForm,
  },
  setup() {
    const authStore = useAuthStore()

    const login = async (payload) => {
      try {
        await authStore.signin(payload)
        alert('로그인 성공')
        router.push({
          name: 'HomeRouter',
        })
      } catch (error) {
        alert(error.response?.data || '로그인에 실패했습니다.')
      }
    }

    return {
      login,
    }
  },
}
</script>
