<template>
  <div align="center">
    <h2>Admin Setup</h2>
    <admin-setup-form @register-admin="registerAdmin" />
  </div>
</template>

<script>
import AdminSetupForm from '../../components/member/AdminSetupForm.vue'
import client from '../../modules/client'
import router from '../../router/router'

export default {
  name: 'AdminSetupComponent',
  components: {
    AdminSetupForm,
  },

  setup() {
    const registerAdmin = (payload) => {
      const { userId, userPw, userName } = payload
      client
        .post('/users/setup', { userId, userPw, userName })
        .then((response) => {
          alert('등록 완료')
          console.log(response)
          router.push({
            name: 'HomeRouter',
          })
        })
        .catch((error) => {
          alert(error.response.data)
        })
    }
    return {
      registerAdmin,
    }
  },
}
</script>
