<template>
  <div align="center">
    <h2>Login</h2>
    <signin-form />
  </div>
</template>

<script>
import SigninForm from '../../components/auth/SigninForm.vue'

export default {
  name: 'SigninComponent',
  components: {
    SigninForm,
  },
}
</script>
