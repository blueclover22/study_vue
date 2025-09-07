<template>
  <div align="center">
    <h2>코드그룹 목록</h2>
    <router-link :to="{ name: 'CodeGroupRegisterRouter' }">등록</router-link>
    <code-group-list-form :codeGroups="codeGroupStore.codeGroups" />
  </div>
</template>

<script>
import CodeGroupListForm from '@/components/codeGroup/CodeGroupListForm.vue'
import { useCodeGroupStore } from '@/stores/codeGroup'
import { onMounted } from 'vue'

export default {
  name: 'CodeGroupList',
  components: { CodeGroupListForm },

  setup() {
    const codeGroupStore = useCodeGroupStore()

    onMounted(async () => {
      try {
        await codeGroupStore.fetchCodeGroupList()
      } catch (error) {
        console.error('Failed to fetch code group list:', error)
      }
    })

    return {
      codeGroupStore
    }
  }
}
</script>
