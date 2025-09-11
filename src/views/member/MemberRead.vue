<template>
  <div align="center">
    <h2>회원 상세조회</h2>
    <member-read-form
      v-if="!memberStore.loading && memberStore.member && memberStore.jobCodes"
      :member="memberStore.member"
      :jobCodes="memberStore.jobCodes"
    />
    <p v-else-if="memberStore.loading">데이터를 불러오는 중...</p>
    <p v-else>데이터를 불러올 수 없습니다.</p>
    <div v-if="!memberStore.loading && memberStore.member && memberStore.jobCodes">
      <router-link
        :to="{ name: 'MemberModifyRouter', params: { userNo: memberStore.member.userNo } }"
        >수정</router-link
      >
      <button @click="deletePost">삭제</button>
      <router-link :to="{ name: 'MemberListRouter' }">목록</router-link>
    </div>
  </div>
</template>

<script>
import MemberReadForm from '@/components/member/MemberReadForm.vue'
import { useMemberStore } from '@/stores/member'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router/router'

export default {
  name: 'MemberRead',
  components: { MemberReadForm },

  setup() {
    const route = useRoute()
    const memberStore = useMemberStore()
    const userNo = route.params.userNo

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
      if (userNo) {
        const jobCodesResult = await memberStore.fetchJobCodes()
        if (!jobCodesResult.success) {
          handleError(jobCodesResult)
          return
        }

        const memberResult = await memberStore.fetchMember(userNo)
        if (!memberResult.success) {
          handleError(memberResult)
          return
        }
      }
    })

    const deletePost = async () => {
      const { userNo } = memberStore.member
      const result = await memberStore.deleteMember(userNo)
      if (result.success) {
        alert('삭제 완료')
        router.push({ name: 'MemberListRouter' })
      } else {
        handleError(result)
        return
      }
    }

    return {
      memberStore,
      userNo,
      deletePost,
    }
  },
}
</script>
