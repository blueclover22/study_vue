import { defineStore } from 'pinia'
import { ref } from 'vue'
import client from '@/modules/client'

export const useMemberStore = defineStore('member', () => {
  // state
  const jobCodes = ref([])
  const members = ref([])
  const member = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const handleError = (err, defaultMessage) => {
    console.error('API Error:', err)
    if (err.response?.status === 401) {
      // 인증 에러
      return { type: 'auth', message: '로그인이 필요합니다.' }
    } else if (err.response?.status === 403) {
      // 권한 에러
      return { type: 'permission', message: '접근 권한이 없습니다.' }
    } else if (err.response?.status >= 500) {
      // 서버 에러
      return { type: 'server', message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' }
    } else {
      // 기타 에러
      const message = err.response?.data?.message || defaultMessage
      return { type: 'client', message }
    }
  }

  // Actions
  const fetchJobCodes = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await client.get('/codes/job')
      jobCodes.value = response.data
      return { success: true, data: response.data }
    } catch (err) {
      const errorResult = handleError(err, '직업 코드를 불러오는데 실패했습니다.')
      error.value = errorResult
      return { success: false, error: errorResult }
    } finally {
      loading.value = false
    }
  }

  const fetchMemberList = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await client.get('/users')
      members.value = response.data
      return { success: true, data: response.data }
    } catch (err) {
      const errorResult = handleError(err, '회원 목록을 불러오는데 실패했습니다.')
      error.value = errorResult
      return { success: false, error: errorResult }
    } finally {
      loading.value = false
    }
  }

  const fetchMember = async (userNo) => {
    loading.value = true
    error.value = null

    try {
      const response = await client.get(`/users/${userNo}`)
      member.value = response.data
      return { success: true, data: response.data }
    } catch (err) {
      const errorResult = handleError(err, '회원 정보를 불러오는데 실패했습니다.')
      error.value = errorResult
      return { success: false, error: errorResult }
    } finally {
      loading.value = false
    }
  }

  const signup = async (payload) => {
    loading.value = true
    error.value = null

    try {
      const response = await client.post('/users', payload)
      return { success: true, data: response.data }
    } catch (err) {
      const errorResult = handleError(err, '회원가입에 실패했습니다.')
      error.value = errorResult
      return { success: false, error: errorResult }
    } finally {
      loading.value = false
    }
  }

  const createMember = async (payload) => {
    loading.value = true
    error.value = null

    try {
      const response = await client.post('/users', payload)
      members.value.push(response.data)
      return { success: true, data: response.data }
    } catch (err) {
      const errorResult = handleError(err, '회원 등록에 실패했습니다.')
      error.value = errorResult
      return { success: false, error: errorResult }
    } finally {
      loading.value = false
    }
  }

  const updateMember = async (userNo, payload) => {
    loading.value = true
    error.value = null

    try {
      const response = await client.put(`/users/${userNo}`, payload)

      if (member.value && member.value.userNo === userNo) {
        member.value = response.data
      }
      return { success: true, data: response.data }
    } catch (err) {
      const errorResult = handleError(err, '회원 수정에 실패했습니다.')
      error.value = errorResult
      return { success: false, error: errorResult }
    } finally {
      loading.value = false
    }
  }

  const deleteMember = async (userNo) => {
    loading.value = true
    error.value = null

    try {
      await client.delete(`/users/${userNo}`)
      return { success: true, data: true }
    } catch (err) {
      const errorResult = handleError(err, '회원 삭제에 실패했습니다.')
      error.value = errorResult
      return { success: false, error: errorResult }
    } finally {
      loading.value = false
    }
  }

  return {
    // state
    jobCodes,
    loading,
    error,
    members,
    member,

    // actions
    fetchJobCodes,
    fetchMemberList,
    fetchMember,
    signup,
    createMember,
    updateMember,
    deleteMember,
  }
})
