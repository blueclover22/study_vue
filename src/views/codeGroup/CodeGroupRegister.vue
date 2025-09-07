<template>
  <div align="center">
    <h2>코드그룹 등록</h2>
    <code-group-register-form @add-post="addPost" />
  </div>
</template>

<script>
import client from '@/modules/client'
import CodeGroupRegisterForm from '@/components/codeGroup/CodeGroupRegisterForm.vue'
import router from '@/router/router'

export default {
  name: 'CodeGroupRegister',
  components: { CodeGroupRegisterForm },
  setup() {
    const addPost = (payload) => {
      const { groupCode, groupName } = payload
      client
        .post('/codeGroups', { groupCode, groupName })
        .then((response) => {
          alert('등록 완료')
          console.log(response.data)
          router.push({
            name: 'CodeGroupReadRouter',
            params: { groupCode: response.data.groupCode },
          })
        })
        .catch((error) => {
          if (error.response.status === 401) {
            alert('로그인 필요')
            router.push({ name: 'SigninRouter' })
          } else if (error.response.status === 403) {
            alert('접근 권한이 없습니다.')
            router.back()
          } else {
            alert(error.response.data.message)
          }
        })
    }
    return {
      addPost
    }
  }
}
</script>
