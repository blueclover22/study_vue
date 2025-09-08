import { defineStore } from 'pinia'
import { ref } from 'vue'
import client from '@/modules/client'

export const useCodeGroupStore = defineStore('codeGroup', () => {
  // State - ref를 사용하여 반응형 최적화
  const codeGroups = ref([])
  const codeGroup = ref(null)
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
  // 코드그룹 목록 조회
  const fetchCodeGroupList = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await client.get('/codeGroups')
      codeGroups.value = response.data
      return { success: true, data: response.data }
    } catch (err) {
      const errorResult = handleError(err, '코드그룹 목록을 불러오는데 실패했습니다.')
      error.value = errorResult
      return { success: false, error: errorResult }
    } finally {
      loading.value = false
    }
  }

  // 단일 코드그룹 조회
  const fetchCodeGroup = async (groupCode) => {
    loading.value = true
    error.value = null

    try {
      const response = await client.get(`/codeGroups/${groupCode}`)
      codeGroup.value = response.data
      return { success: true, data: response.data }
    } catch (err) {
      const errorResult = handleError(err, '코드그룹을 불러오는데 실패했습니다.')
      error.value = errorResult
      return { success: false, error: errorResult }
    } finally {
      loading.value = false
    }
  }

  // 코드그룹 생성
  const createCodeGroup = async (codeGroupData) => {
    loading.value = true
    error.value = null

    try {
      const response = await client.post('/codeGroups', codeGroupData)
      codeGroups.value.push(response.data)
      return { success: true, data: response.data }
    } catch (err) {
      const errorResult = handleError(err, '코드그룹 등록에 실패했습니다.')
      error.value = errorResult
      return { success: false, error: errorResult }
    } finally {
      loading.value = false
    }
  }

  // 코드그룹 수정
  const updateCodeGroup = async (groupCode, codeGroupData) => {
    loading.value = true
    error.value = null

    try {
      const response = await client.put(`/codeGroups/${groupCode}`, codeGroupData)

      // 목록에서 해당 코드그룹 업데이트
      const index = codeGroups.value.findIndex((group) => group.groupCode === groupCode)
      if (index !== -1) {
        codeGroups.value[index] = response.data
      }

      // 현재 선택된 코드그룹이 수정된 것이면 업데이트
      if (codeGroup.value && codeGroup.value.groupCode === groupCode) {
        codeGroup.value = response.data
      }

      return { success: true, data: response.data }
    } catch (err) {
      const errorResult = handleError(err, '코드그룹 수정에 실패했습니다.')
      error.value = errorResult
      return { success: false, error: errorResult }
    } finally {
      loading.value = false
    }
  }

  // 코드그룹 삭제
  const deleteCodeGroup = async (groupCode) => {
    loading.value = true
    error.value = null

    try {
      await client.delete(`/codeGroups/${groupCode}`)

      // 목록에서 삭제
      codeGroups.value = codeGroups.value.filter((group) => group.groupCode !== groupCode)

      // 현재 선택된 코드그룹이 삭제된 것이면 초기화
      if (codeGroup.value && codeGroup.value.groupCode === groupCode) {
        codeGroup.value = null
      }

      return { success: true, data: true }
    } catch (err) {
      const errorResult = handleError(err, '코드그룹 삭제에 실패했습니다.')
      error.value = errorResult
      return { success: false, error: errorResult }
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    codeGroups,
    codeGroup,
    loading,
    error,

    // Actions
    fetchCodeGroupList,
    fetchCodeGroup,
    createCodeGroup,
    updateCodeGroup,
    deleteCodeGroup,
  }
})
