<template>
  <div align="center">
    <h2>코드상세 수정</h2>
    <code-detail-modify-form
      v-if="!codeDetailStore.loading && codeDetailStore.codeDetail"
      :codeDetail="codeDetailStore.codeDetail"
      :codeGroups="codeDetailStore.codeGroups"
      @modify-post="modifyPost"
    />
    <p v-else-if="codeDetailStore.loading">데이터를 불러오는 중...</p>
    <p v-else>데이터를 불러올 수 없습니다.</p>
  </div>
</template>

<script>
import CodeDetailModifyForm from '@/components/codeDetail/CodeDetailModifyForm.vue'
import { useCodeDetailStore } from '@/stores/codeDetail'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router/router'

export default {
  name: 'CodeDetailModify',
  components: { CodeDetailModifyForm },

  setup() {
    const route = useRoute()
    const codeDetailStore = useCodeDetailStore()
    const groupCode = route.params.groupCode
    const codeValue = route.params.codeValue

    onMounted(async () => {
      if (groupCode && codeValue) {
        const result = await codeDetailStore.fetchCodeDetail(groupCode, codeValue)
        if (!result.success) {
          if (result.error.type === 'auth') {
            alert(result.error.message)
            router.push({ name: 'SigninRouter' })
          } else if (result.error.type === 'permission') {
            alert(result.error.message)
            router.back()
          } else {
            alert(result.error.message)
            router.back()
          }
        }
      }
    })

    const modifyPost = async (payload) => {
      const { groupCode, codeValue, codeName } = payload
      const result = await codeDetailStore.updateCodeDetail(groupCode, codeValue, {
        codeValue,
        codeName,
      })

      if (result.success) {
        alert('수정 완료')
        router.push({
          name: 'CodeDetailReadRouter',
          params: { groupCode: groupCode, codeValue: codeValue },
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
      codeDetailStore,
      groupCode,
      codeValue,
      modifyPost,
    }
  },
}
</script>
