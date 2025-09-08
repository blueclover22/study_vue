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

    const handleError = (error) => {
      if (error.response?.data) {
        alert(error.response.data)
      } else {
        alert('로그인에 실패했습니다.')
      }
    }

    const login = async (payload) => {
      try {
        await authStore.signin(payload)
        alert('로그인 성공')
        router.push({
          name: 'HomeRouter',
        })
      } catch (error) {
        handleError(error)
      }
    }

    return {
      login,
    }
  },
}
</script>
