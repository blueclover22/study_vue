<template>
  <div align="center">
    <h2>회원 등록</h2>
    <member-register-form
      v-if="!memberStore.loading"
      @add-post="addPost"
      :jobCodes="memberStore.jobCodes"
    />
    <p v-else>등록 처리 중...</p>
  </div>
</template>

<script>
import MemberRegisterForm from '@/components/member/MemberRegisterForm.vue'
import { useMemberStore } from '@/stores/member'
import { onMounted } from 'vue'
import router from '@/router/router'

export default {
  name: 'MemberRegister',
  components: { MemberRegisterForm },

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
      const result = await memberStore.fetchJobCodes()
      if (!result.success) {
        handleError(result)
        return
      }
    })

    const addPost = async (payload) => {
      const { userId, userPw, userName, job } = payload
      const result = await memberStore.createMember({ userId, userPw, userName, job })

      if (result.success) {
        alert('등록 완료')
        router.push({ name: 'MemberListRouter' })
      } else {
        handleError(result)
        return
      }
    }

    return {
      memberStore,
      addPost,
    }
  },
}
</script>
