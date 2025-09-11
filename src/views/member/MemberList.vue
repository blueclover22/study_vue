<template>
  <div align="center">
    <h2>회원 목록</h2>
    <router-link :to="{ name: 'MemberRegisterRouter' }">등록</router-link>
    <member-list-form v-if="!memberStore.loading" :members="memberStore.members" />
    <p v-else-if="memberStore.loading">데이터를 불러오는 중...</p>
    <p v-else>데이터를 불러올 수 없습니다.</p>
  </div>
</template>

<script>
import MemberListForm from '@/components/member/MemberListForm.vue'
import { useMemberStore } from '@/stores/member'
import { onMounted } from 'vue'
import router from '@/router/router'

export default {
  name: 'MemberList',
  components: { MemberListForm },

  setup() {
    const memberStore = useMemberStore()

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
      const result = await memberStore.fetchMemberList()
      if (!result.success) {
        handleError(result)
        console.error('Failed to fetch member list:', result.error)
        return
      }
    })

    return {
      memberStore,
    }
  },
}
</script>
