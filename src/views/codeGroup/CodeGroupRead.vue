<template>
  <div align="center">
    <h2>코드그룹 상세조회</h2>
    <code-group-read-form v-if="codeGroupStore.codeGroup" :codeGroup="codeGroupStore.codeGroup" />
    <router-link :to="{ name: 'CodeGroupModifyRouter', params: { groupCode } }">수정</router-link>
    <button @click="deletePost">삭제</button>
    <router-link :to="{ name: 'CodeGroupListRouter' }">목록</router-link>
  </div>
</template>

<script>
import { useCodeGroupStore } from '@/stores/codeGroup'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router/router'
import CodeGroupReadForm from '@/components/codeGroup/CodeGroupReadForm.vue'

export default {
  name: 'CodeGroupRead',
  components: { CodeGroupReadForm },
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

    const deletePost = async () => {
      const { groupCode } = codeGroupStore.codeGroup
      try {
        await codeGroupStore.deleteCodeGroup(groupCode)
        alert('삭제 완료')
        router.push({ name: 'CodeGroupListRouter' })
      } catch (error) {
        if (error.response?.status === 401) {
          alert('로그인 필요')
          router.push({ name: 'SigninRouter' })
        } else if (error.response?.status === 403) {
          alert('접근 권한이 없습니다.')
          router.back()
        } else {
          alert(error.response?.data?.message || '삭제에 실패했습니다.')
        }
      }
    }
    
    return {
      codeGroupStore,
      groupCode,
      deletePost
    }
  }
}
</script>
