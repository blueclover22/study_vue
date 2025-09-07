<template>
  <div align="center">
    <h2>코드그룹 등록</h2>
    <code-group-register-form @add-post="addPost" />
  </div>
</template>

<script>
import CodeGroupRegisterForm from '@/components/codeGroup/CodeGroupRegisterForm.vue'
import { useCodeGroupStore } from '@/stores/codeGroup'
import router from '@/router/router'

export default {
  name: 'CodeGroupRegister',
  components: { CodeGroupRegisterForm },
  setup() {
    const codeGroupStore = useCodeGroupStore()

    const addPost = async (payload) => {
      const { groupCode, groupName } = payload

      try {
        const response = await codeGroupStore.createCodeGroup({ groupCode, groupName })
        alert('등록 완료')
        console.log(response)
        router.push({
          name: 'CodeGroupReadRouter',
          params: { groupCode: response.groupCode },
        })
      } catch (error) {
        if (error.response?.status === 401) {
          alert('로그인 필요')
          router.push({ name: 'SigninRouter' })
        } else if (error.response?.status === 403) {
          alert('접근 권한이 없습니다.')
          router.back()
        } else {
          alert(error.response?.data?.message || '등록에 실패했습니다.')
        }
      }
    }

    return {
      addPost
    }
  }
}
</script>
