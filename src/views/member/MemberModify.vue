<template>
  <div align="center">
    <h2>회원 수정</h2>
    <member-modify-form
      v-if="!memberStore.loading && memberStore.member && memberStore.jobCodes"
      :member="memberStore.member"
      :jobCodes="memberStore.jobCodes"
      @modify-post="modifyPost"
    />
    <p v-else-if="memberStore.loading">데이터를 불러오는 중...</p>
    <p v-else>데이터를 불러올 수 없습니다.</p>
  </div>
</template>

<script>
import MemberModifyForm from '@/components/member/MemberModifyForm.vue'
import { useMemberStore } from '@/stores/member'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router/router'

export default {
  name: 'MemberModify',
  components: { MemberModifyForm },

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

    const modifyPost = async (payload) => {
      const { userNo, userId, userPw, userName, job, authList } = payload
      const result = await memberStore.updateMember(userNo, {
        userId,
        userPw,
        userName,
        job,
        authList,
      })
      if (result.success) {
        alert('수정 완료')
        router.push({ name: 'MemberReadRouter', params: { userNo: userNo } })
      } else {
        handleError(result)
        return
      }
    }

    return {
      memberStore,
      userNo,
      modifyPost,
    }
  },
}
</script>
