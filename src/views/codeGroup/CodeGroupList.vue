<template>
  <div align="center">
    <h2>코드그룹 목록</h2>
    <router-link :to="{ name: 'CodeGroupRegisterRouter' }">등록</router-link>
    <code-group-list-form v-if="!codeGroupStore.loading" :codeGroups="codeGroupStore.codeGroups" />
    <p v-else-if="codeGroupStore.loading">데이터를 불러오는 중...</p>
    <p v-else>데이터를 불러올 수 없습니다.</p>
  </div>
</template>

<script>
import CodeGroupListForm from '@/components/codeGroup/CodeGroupListForm.vue'
import { useCodeGroupStore } from '@/stores/codeGroup'
import { onMounted } from 'vue'
import router from '@/router/router'

export default {
  name: 'CodeGroupList',
  components: { CodeGroupListForm },

  setup() {
    const codeGroupStore = useCodeGroupStore()

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
      const result = await codeGroupStore.fetchCodeGroupList()
      if (!result.success) {
        handleError(result)
        console.error('Failed to fetch code group list:', result.error)
        return
      }
    })

    return {
      codeGroupStore,
    }
  },
}
</script>
