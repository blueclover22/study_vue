<template>
  <div align="center">
    <h2>Login</h2>
    <signin-form @sign-in="login" />
  </div>
</template>

<script>
import SigninForm from '../../components/auth/SigninForm.vue'
import router from '../../router/router'
import { inject } from 'vue'

export default {
  name: 'SigninComponent',
  components: {
    SigninForm,
  },
  setup() {
    const signin = inject('signin')

    const login = (payload) => {
      signin(payload)
        .then(() => {
          alert('로그인 성공')
          router.push({
            name: 'HomeRouter',
          })
        })
        .catch((error) => {
          alert(error.response.data)
        })
    }

    return {
      login,
    }
  },
}
</script>
