import { defineStore } from 'pinia'
import { ref } from 'vue'
import client from '@/modules/client'

export const useCodeDetailStore = defineStore('codeDetail', () => {
  // state
  const codeDetails = ref([])
  const codeDetail = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // 에러 처리 함수
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
  const fetchCodeDetailList = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await client.get('/codeDetails')
      codeDetails.value = response.data
      return { success: true, data: response.data }
    } catch (err) {
      const errorResult = handleError(err, '코드 목록을 불러오는데 실패했습니다.')
      error.value = errorResult
      return { success: false, error: errorResult }
    } finally {
      loading.value = false
    }
  }

  const fetchCodeDetail = async (groupCode, codeValue) => {
    loading.value = true
    error.value = null

    try {
      const response = await client.get(`/codeDetails/${groupCode}/${codeValue}`)
      codeDetail.value = response.data
      return { success: true, data: response.data }
    } catch (err) {
      const errorResult = handleError(err, '코드 정보를 불러오는데 실패했습니다.')
      error.value = errorResult
      return { success: false, error: errorResult }
    } finally {
      loading.value = false
    }
  }

  const createCodeDetail = async (codeDetailData) => {
    loading.value = true
    error.value = null

    try {
      const response = await client.post('/codeDetails', codeDetailData)
      codeDetails.value.push(response.data)
      return { success: true, data: response.data }
    } catch (err) {
      const errorResult = handleError(err, '코드 정보를 등록하는데 실패했습니다.')
      error.value = errorResult
      return { success: false, error: errorResult }
    } finally {
      loading.value = false
    }
  }

  const updateCodeDetail = async (groupCode, codeValue, codeDetailData) => {
    loading.value = true
    error.value = null

    try {
      const response = await client.put(`/codeDetails/${groupCode}/${codeValue}`, codeDetailData)
      const index = codeDetails.value.findIndex(
        (detail) => detail.groupCode === groupCode && detail.codeValue === codeValue,
      )

      if (index !== -1) {
        codeDetails.value[index] = response.data
      }

      if (
        codeDetail.value &&
        codeDetail.value.groupCode === groupCode &&
        codeDetail.value.codeValue === codeValue
      ) {
        codeDetail.value = response.data
      }

      return { success: true, data: response.data }
    } catch (err) {
      const errorResult = handleError(err, '코드 정보를 수정하는데 실패했습니다.')
      error.value = errorResult
      return { success: false, error: errorResult }
    } finally {
      loading.value = false
    }
  }

  const deleteCodeDetail = async (groupCode, codeValue) => {
    loading.value = true
    error.value = null

    try {
      await client.delete(`/codeDetails/${groupCode}/${codeValue}`)
      return { success: true, data: true }
    } catch (err) {
      const errorResult = handleError(err, '코드 정보를 삭제하는데 실패했습니다.')
      error.value = errorResult
      return { success: false, error: errorResult }
    } finally {
      loading.value = false
    }
  }

  return {
    // state
    codeDetails,
    codeDetail,
    loading,
    error,

    // actions
    fetchCodeDetailList,
    fetchCodeDetail,
    createCodeDetail,
    updateCodeDetail,
    deleteCodeDetail,
  }
})
