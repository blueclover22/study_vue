<template>
  <div align="center">
    <h2>코드 목록</h2>
    <router-link :to="{ name: 'CodeDetailRegisterRouter' }">등록</router-link>
    <code-detail-list-form
      v-if="!codeDetailStore.loading"
      :codeDetails="codeDetailStore.codeDetails"
    />
    <p v-else-if="codeDetailStore.loading">데이터를 불러오는 중...</p>
    <p v-else>데이터를 불러올 수 없습니다.</p>
  </div>
</template>

<script>
import CodeDetailListForm from '@/components/codeDetail/CodeDetailListForm.vue'
import { useCodeDetailStore } from '@/stores/codeDetail'
import { onMounted } from 'vue'
import router from '@/router/router'

export default {
  name: 'CodeDetailList',
  components: { CodeDetailListForm },

  setup() {
    const codeDetailStore = useCodeDetailStore()

    onMounted(async () => {
      const result = await codeDetailStore.fetchCodeDetailList()
      if (!result.success) {
        if (result.error.type === 'auth') {
          alert(result.error.message)
          router.push({ name: 'SigninRouter' })
        } else {
          alert(result.error.message)
        }
        console.error('Failed to fetch code detail list:', result.error)
      }
    })

    return {
      codeDetailStore,
    }
  },
}
</script>
