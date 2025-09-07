import { defineStore } from 'pinia'
import { ref } from 'vue'
import client from '@/modules/client'

export const useCodeGroupStore = defineStore('codeGroup', () => {
  // State - ref를 사용하여 반응형 최적화
  const codeGroups = ref([])
  const codeGroup = ref(null)


  // Actions

  // 코드그룹 목록 조회
  const fetchCodeGroupList = async () => {
    try {
      const response = await client.get('/codeGroups')
      codeGroups.value = response.data
      return response.data
    } catch (error) {
      console.error('코드그룹 목록 조회 실패:', error)
      throw error
    }
  }

  // 단일 코드그룹 조회
  const fetchCodeGroup = async (groupCode) => {
    try {
      const response = await client.get(`/codeGroups/${groupCode}`)
      codeGroup.value = response.data
      return response.data
    } catch (error) {
      console.error('코드그룹 조회 실패:', error)
      throw error
    }
  }

  // 코드그룹 생성
  const createCodeGroup = async (codeGroupData) => {
    try {
      const response = await client.post('/codeGroups', codeGroupData)
      codeGroups.value.push(response.data)
      return response.data
    } catch (error) {
      console.error('코드그룹 생성 실패:', error)
      throw error
    }
  }

  // 코드그룹 수정
  const updateCodeGroup = async (groupCode, codeGroupData) => {
    try {
      const response = await client.put(`/codeGroups/${groupCode}`, codeGroupData)
      
      // 목록에서 해당 코드그룹 업데이트
      const index = codeGroups.value.findIndex(group => group.groupCode === groupCode)
      if (index !== -1) {
        codeGroups.value[index] = response.data
      }
      
      // 현재 선택된 코드그룹이 수정된 것이면 업데이트
      if (codeGroup.value && codeGroup.value.groupCode === groupCode) {
        codeGroup.value = response.data
      }
      
      return response.data
    } catch (error) {
      console.error('코드그룹 수정 실패:', error)
      throw error
    }
  }

  // 코드그룹 삭제
  const deleteCodeGroup = async (groupCode) => {
    try {
      await client.delete(`/codeGroups/${groupCode}`)
      
      // 목록에서 삭제
      codeGroups.value = codeGroups.value.filter(group => group.groupCode !== groupCode)
      
      // 현재 선택된 코드그룹이 삭제된 것이면 초기화
      if (codeGroup.value && codeGroup.value.groupCode === groupCode) {
        codeGroup.value = null
      }
      
      return true
    } catch (error) {
      console.error('코드그룹 삭제 실패:', error)
      throw error
    }
  }


  return {
    // State
    codeGroups,
    codeGroup,
    
    // Actions
    fetchCodeGroupList,
    fetchCodeGroup,
    createCodeGroup,
    updateCodeGroup,
    deleteCodeGroup,
  }
})
