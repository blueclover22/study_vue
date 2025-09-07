<template>
  <div align="center">
    <h2>코드그룹 수정</h2>
    <code-group-modify-form v-if="codeGroupStore.codeGroup" :codeGroup="codeGroupStore.codeGroup" @modify-post="modifyPost" />
    <p v-else>Loading...</p>
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
    
    onMounted(async () => {
      if (groupCode) {
        try {
          await codeGroupStore.fetchCodeGroup(groupCode)
        } catch (error) {
          alert(error.response?.data?.message || '코드그룹을 불러오는데 실패했습니다.')
          router.back()
        }
      }
    })

    const modifyPost = async (payload) => {
      const { groupName } = payload

      try {
        await codeGroupStore.updateCodeGroup(groupCode, { groupName })
        alert('수정 완료')
        router.push({ name: 'CodeGroupReadRouter', params: { groupCode: groupCode } })
      } catch (error) {
        if (error.response?.status === 401) {
          alert('로그인 필요')
          router.push({ name: 'SigninRouter' })
        } else if (error.response?.status === 403) {
          alert('접근 권한이 없습니다.')
          router.back()
        } else {
          alert(error.response?.data?.message || '수정에 실패했습니다.')
        }
      }
    }

    return {
      codeGroupStore,
      groupCode,
      modifyPost
    }
  }
}
</script>
