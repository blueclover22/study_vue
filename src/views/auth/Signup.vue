<template>
  <div align="center">
    <h2>회원가입</h2>
    <signup-form v-if="!memberStore.loading" :jobCodes="memberStore.jobCodes" @sign-up="signup" />
    <p v-else-if="memberStore.loading">데이터를 불러오는 중...</p>
    <p v-else>데이터를 불러올 수 없습니다.</p>
    <router-link :to="{ name: 'SigninRouter' }">LOG IN</router-link>
  </div>
</template>

<script>
import SignupForm from '@/components/auth/SignupForm.vue'
import { useMemberStore } from '@/stores/member'
import { onMounted } from 'vue'
import router from '@/router/router'

export default {
  name: 'SignupView',
  components: { SignupForm },

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

    const signup = async (payload) => {
      const { userId, userPw, userName, job } = payload
      const result = await memberStore.signup({ userId, userPw, userName, job })

      if (result.success) {
        alert('회원가입 완료')
        router.push({ name: 'SigninRouter' })
      } else {
        handleError(result)
        return
      }
    }

    return {
      memberStore,
      signup,
    }
  },
}
</script>
