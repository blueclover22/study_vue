<template>
  <div align="center">
    <h2>코드그룹 목록</h2>
    <router-link :to="{ name: 'CodeGroupRegisterRouter' }">등록</router-link>
    <code-group-list-form :codeGroups="codeGroups" />
  </div>
</template>

<script>
import CodeGroupListForm from '@/components/codeGroup/CodeGroupListForm.vue'
import { inject, onMounted } from 'vue'

export default {
  name: 'CodeGroupList',
  components: { CodeGroupListForm },

  setup() {
    const codeGroups = inject('codeGroups')
    const fetchCodeGroupList = inject('fetchCodeGroupList')

    onMounted(() => {
      fetchCodeGroupList()
    })

    return {
      codeGroups
    }
  }
}
</script>
