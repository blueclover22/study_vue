<template>
  <div align="center">
    <h2>코드그룹 등록</h2>
    <code-group-register-form v-if="!codeGroupStore.loading" @add-post="addPost" />
    <p v-else>등록 처리 중...</p>
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
      const result = await codeGroupStore.createCodeGroup({ groupCode, groupName })

      if (result.success) {
        alert('등록 완료')
        router.push({
          name: 'CodeGroupReadRouter',
          params: { groupCode: result.data.groupCode },
        })
      } else {
        if (result.error.type === 'auth') {
          alert(result.error.message)
          router.push({ name: 'SigninRouter' })
        } else if (result.error.type === 'permission') {
          alert(result.error.message)
          router.back()
        } else {
          alert(result.error.message)
        }
      }
    }

    return {
      codeGroupStore,
      addPost,
    }
  },
}
</script>
