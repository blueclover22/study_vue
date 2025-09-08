<template>
  <div align="center">
    <h2>코드 상세조회</h2>
    <code-detail-read-form
      v-if="!codeDetailStore.loading && codeDetailStore.codeDetail && codeDetailStore.codeGroups"
      :codeDetail="codeDetailStore.codeDetail"
      :codeGroups="codeDetailStore.codeGroups"
    />
    <p v-else-if="codeDetailStore.loading">데이터를 불러오는 중...</p>
    <p v-else>데이터를 불러올 수 없습니다.</p>
    <div
      v-if="!codeDetailStore.loading && codeDetailStore.codeDetail && codeDetailStore.codeGroups"
    >
      <router-link :to="{ name: 'CodeDetailModifyRouter', params: { groupCode, codeValue } }"
        >수정</router-link
      >
      <button @click="deletePost">삭제</button>
      <router-link :to="{ name: 'CodeDetailListRouter' }">목록</router-link>
    </div>
  </div>
</template>

<script>
import CodeDetailReadForm from '@/components/codeDetail/CodeDetailReadForm.vue'
import { useCodeDetailStore } from '@/stores/codeDetail'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router/router'

export default {
  name: 'CodeDetailRead',
  components: { CodeDetailReadForm },

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

    const deletePost = async () => {
      const { groupCode, codeValue } = codeDetailStore.codeDetail
      const result = await codeDetailStore.deleteCodeDetail(groupCode, codeValue)
      if (result.success) {
        alert('삭제 완료')
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
      groupCode,
      codeValue,
      deletePost,
    }
  },
}
</script>
