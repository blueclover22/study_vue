<template>
  <div align="center">
    <h2>코드상세 수정</h2>
    <code-detail-modify-form
      v-if="!codeDetailStore.loading && codeDetailStore.codeDetail && codeGroupStore.codeGroups"
      :codeDetail="codeDetailStore.codeDetail"
      :codeGroups="codeGroupStore.codeGroups"
      @modify-post="modifyPost"
    />
    <p v-else-if="codeDetailStore.loading">데이터를 불러오는 중...</p>
    <p v-else>데이터를 불러올 수 없습니다.</p>
  </div>
</template>

<script>
import CodeDetailModifyForm from '@/components/codeDetail/CodeDetailModifyForm.vue'
import { useCodeDetailStore } from '@/stores/codeDetail'
import { useCodeGroupStore } from '@/stores/codeGroup'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router/router'

export default {
  name: 'CodeDetailModify',
  components: { CodeDetailModifyForm },

  setup() {
    const route = useRoute()
    const codeDetailStore = useCodeDetailStore()
    const codeGroupStore = useCodeGroupStore()
    const groupCode = route.params.groupCode
    const codeValue = route.params.codeValue

    const handleError = (result) => {
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

    onMounted(async () => {
      if (groupCode && codeValue) {
        // CodeGroup 목록 로드
        const codeGroupResult = await codeGroupStore.fetchCodeGroupList()
        if (!codeGroupResult.success) {
          handleError(codeGroupResult)
          return
        }

        // CodeDetail 상세 정보 로드
        const codeDetailResult = await codeDetailStore.fetchCodeDetail(groupCode, codeValue)
        if (!codeDetailResult.success) {
          handleError(codeDetailResult)
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
        handleError(result)
      }
    }

    return {
      codeDetailStore,
      codeGroupStore,
      groupCode,
      codeValue,
      modifyPost,
    }
  },
}
</script>
