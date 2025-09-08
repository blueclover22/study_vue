<template>
  <div align="center">
    <h2>코드 등록</h2>
    <code-detail-register-form
      v-if="!codeDetailStore.loading"
      @add-post="addPost"
      :codeGroups="codeGroupStore.codeGroups"
    />
    <p v-else>등록 처리 중...</p>
  </div>
</template>

<script>
import CodeDetailRegisterForm from '@/components/codeDetail/CodeDetailRegisterForm.vue'
import { useCodeDetailStore } from '@/stores/codeDetail'
import { useCodeGroupStore } from '@/stores/codeGroup'
import { onMounted } from 'vue'
import router from '@/router/router'

export default {
  name: 'CodeDetailRegister',
  components: { CodeDetailRegisterForm },

  setup() {
    const codeDetailStore = useCodeDetailStore()
    const codeGroupStore = useCodeGroupStore()

    onMounted(async () => {
      const result = await codeGroupStore.fetchCodeGroupList()
      if (!result.success) {
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
    })

    const addPost = async (payload) => {
      const { groupCode, codeValue, codeName } = payload
      const result = await codeDetailStore.createCodeDetail({ groupCode, codeValue, codeName })
      
      if (result.success) {
        alert('등록 완료')
        router.push({ name: 'CodeDetailListRouter' })
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
      codeDetailStore,
      codeGroupStore,
      addPost,
    }
  },
}
</script>
