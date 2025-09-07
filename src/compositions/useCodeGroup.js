import { reactive, computed } from 'vue'
import client from '@/modules/client'

export const useCodeGroup = () => {
  const state = reactive({
    codeGroups: [],
    codeGroup: null,
  })

  const codeGroups = computed(() => state.codeGroups)
  const codeGroup = computed(() => state.codeGroup)

  const FETCH_LIST = (codeGroups) => {
    state.codeGroups = codeGroups
  }

  const FETCH_ONE = (codeGroup) => {
    state.codeGroup = codeGroup
  }

  const fetchCodeGroupList = () => {
    return client.get('/codeGroups').then((response) => {
      FETCH_LIST(response.data)
    })
  }

  const fetchCodeGroup = (groupCode) => {
    console.log('fetchCodeGroup called with groupCode:', groupCode)
    return client.get(`/codeGroups/${groupCode}`).then((response) => {
      console.log('fetchCodeGroup response:', response.data)
      FETCH_ONE(response.data)
    })
  }

  return {
    codeGroups,
    codeGroup,
    fetchCodeGroupList,
    fetchCodeGroup
  }
}
