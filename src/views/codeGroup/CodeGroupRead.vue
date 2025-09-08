<template>
  <div align="center">
    <h2>코드그룹 상세조회</h2>
    <code-group-read-form
      v-if="!codeGroupStore.loading && codeGroupStore.codeGroup"
      :codeGroup="codeGroupStore.codeGroup"
    />
    <p v-else-if="codeGroupStore.loading">데이터를 불러오는 중...</p>
    <p v-else>데이터를 불러올 수 없습니다.</p>
    <div v-if="!codeGroupStore.loading && codeGroupStore.codeGroup">
      <router-link :to="{ name: 'CodeGroupModifyRouter', params: { groupCode } }">수정</router-link>
      <button @click="deletePost">삭제</button>
      <router-link :to="{ name: 'CodeGroupListRouter' }">목록</router-link>
    </div>
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

    const deletePost = async () => {
      const { groupCode } = codeGroupStore.codeGroup
      const result = await codeGroupStore.deleteCodeGroup(groupCode)

      if (result.success) {
        alert('삭제 완료')
        router.push({ name: 'CodeGroupListRouter' })
      } else {
        handleError(result)
      }
    }

    return {
      codeGroupStore,
      groupCode,
      deletePost,
    }
  },
}
</script>
