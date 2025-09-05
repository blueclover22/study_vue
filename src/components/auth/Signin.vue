<template>
  <div>
    <h2>Login</h2>
    <signin-form />
  </div>
</template>

<script>
import SigninForm from './SigninForm.vue'

export default {
  name: 'SigninComponent',
  components: {
    SigninForm,
  },
}
</script>
