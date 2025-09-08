import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import client from '@/modules/client'
import Cookies from 'js-cookie'

export const useAuthStore = defineStore('auth', () => {
  // State - ref를 사용하여 반응형 최적화
  const accessToken = ref('')
  const myinfo = ref(null)

  // Getters - computed를 사용하여 캐싱 최적화
  const isAuthorized = computed(() => {
    return accessToken.value.length > 0 && !!myinfo.value
  })

  const isAdmin = computed(() => {
    if (!myinfo.value || !myinfo.value.authList) {
      return false
    }
    return isAuthorized.value && myinfo.value.authList[0].auth === 'ROLE_ADMIN'
  })

  const isMember = computed(() => {
    if (!myinfo.value || !myinfo.value.authList) {
      return false
    }
    return isAuthorized.value && myinfo.value.authList[0].auth === 'ROLE_MEMBER'
  })

  // Actions

  const signin = async (payload) => {
    try {
      const formData = new URLSearchParams()
      formData.append('username', payload.userId)
      formData.append('password', payload.password)

      const response = await client.post('/api/authenticate', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })

      const { authorization } = response.headers
      const token = authorization.substring(7)

      // 토큰 설정
      accessToken.value = token
      client.defaults.headers.common.Authorization = `Bearer ${token}`
      Cookies.set('accessToken', token, { expires: 1 })

      // 사용자 정보 가져오기
      const myInfoResponse = await client.get('/users/myInfo')
      myinfo.value = myInfoResponse.data

      return myInfoResponse
    } catch (error) {
      // 에러 발생 시 상태 초기화
      accessToken.value = ''
      myinfo.value = null
      delete client.defaults.headers.common.Authorization
      Cookies.remove('accessToken')
      throw error
    }
  }

  const signout = () => {
    accessToken.value = ''
    myinfo.value = null
    delete client.defaults.headers.common.Authorization
    Cookies.remove('accessToken')
  }

  const signinByToken = async (token) => {
    try {
      accessToken.value = token
      client.defaults.headers.common.Authorization = `Bearer ${token}`

      const response = await client.get('/users/myInfo')
      myinfo.value = response.data
      return response
    } catch (error) {
      // 토큰이 유효하지 않은 경우 상태 초기화
      accessToken.value = ''
      myinfo.value = null
      delete client.defaults.headers.common.Authorization
      Cookies.remove('accessToken')
      throw error
    }
  }

  // 토큰 초기화 (앱 시작 시 쿠키에서 토큰 복원)
  const initializeAuth = () => {
    const storedToken = Cookies.get('accessToken')
    if (storedToken) {
      return signinByToken(storedToken).catch(() => {
        // 토큰이 만료되었거나 유효하지 않은 경우 무시
        console.log('Stored token is invalid, clearing auth state')
      })
    }
    return Promise.resolve()
  }

  return {
    // State
    myinfo,

    // Getters
    isAuthorized,
    isAdmin,
    isMember,

    // Actions
    signin,
    signout,
    initializeAuth,
  }
})
