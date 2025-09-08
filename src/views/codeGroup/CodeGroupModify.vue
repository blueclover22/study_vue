<template>
  <div align="center">
    <h2>코드그룹 수정</h2>
    <code-group-modify-form
      v-if="!codeGroupStore.loading && codeGroupStore.codeGroup"
      :codeGroup="codeGroupStore.codeGroup"
      @modify-post="modifyPost"
    />
    <p v-else-if="codeGroupStore.loading">데이터를 불러오는 중...</p>
    <p v-else>데이터를 불러올 수 없습니다.</p>
  </div>
</template>

<script>
import CodeGroupModifyForm from '@/components/codeGroup/CodeGroupModifyForm.vue'
import { useCodeGroupStore } from '@/stores/codeGroup'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router/router'

export default {
  name: 'CodeGroupModify',
  components: { CodeGroupModifyForm },

  setup() {
    const route = useRoute()
    const codeGroupStore = useCodeGroupStore()
    const groupCode = route.params.groupCode

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
      if (groupCode) {
        const result = await codeGroupStore.fetchCodeGroup(groupCode)
        if (!result.success) {
          handleError(result)
        }
      }
    })

    const modifyPost = async (payload) => {
      const { groupName } = payload
      const result = await codeGroupStore.updateCodeGroup(groupCode, { groupName })

      if (result.success) {
        alert('수정 완료')
        router.push({ name: 'CodeGroupReadRouter', params: { groupCode: groupCode } })
      } else {
        handleError(result)
      }
    }

    return {
      codeGroupStore,
      groupCode,
      modifyPost,
    }
  },
}
</script>
