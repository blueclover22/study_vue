import { defineStore } from 'pinia'
import { ref } from 'vue'
import client from '@/modules/client'

export const useBoardStore = defineStore('board', () => {
  // State
  const boards = ref([])
  const board = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const handleError = (err, defaultMessage) => {
    console.error('API Error:', err)
    if (err.response?.status === 401) {
      return { type: 'auth', message: '로그인이 필요합니다.' }
    } else if (err.response?.status === 403) {
      return { type: 'permission', message: '접근 권한이 없습니다.' }
    } else if (err.response?.status >= 500) {
      return { type: 'server', message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' }
    } else {
      const message = err.response?.data?.message || defaultMessage
      return { type: 'client', message }
    }
  }

  // Actions
  const fetchBoardList = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await client.get('/boards')
      boards.value = response.data
      return { success: true, data: response.data }
    } catch (err) {
      const errorResult = handleError(err, '게시판 목록을 불러오는데 실패했습니다.')
      error.value = errorResult
      return { success: false, error: errorResult }
    } finally {
      loading.value = false
    }
  }

  const fetchBoard = async (boardNo) => {
    loading.value = true
    error.value = null

    try {
      const response = await client.get(`/boards/${boardNo}`)
      board.value = response.data
      return { success: true, data: response.data }
    } catch (err) {
      const errorResult = handleError(err, '게시판 정보를 불러오는데 실패했습니다.')
      error.value = errorResult
      return { success: false, error: errorResult }
    } finally {
      loading.value = false
    }
  }

  const createBoard = async (payload) => {
    loading.value = true
    error.value = null

    try {
      const response = await client.post('/boards', payload)
      boards.value.push(response.data)
      return { success: true, data: response.data }
    } catch (err) {
      const errorResult = handleError(err, '게시판 등록에 실패했습니다.')
      error.value = errorResult
      return { success: false, error: errorResult }
    } finally {
      loading.value = false
    }
  }

  const updateBoard = async (boardNo, payload) => {
    loading.value = true
    error.value = null

    try {
      const response = await client.put(`/boards/${boardNo}`, payload)

      if (board.value && board.value.boardNo === boardNo) {
        board.value = response.data
      }

      return { success: true, data: response.data }
    } catch (err) {
      const errorResult = handleError(err, '게시판 수정에 실패했습니다.')
      error.value = errorResult
      return { success: false, error: errorResult }
    } finally {
      loading.value = false
    }
  }

  const deleteBoard = async (boardNo) => {
    loading.value = true
    error.value = null

    try {
      await client.delete(`/boards/${boardNo}`)
      return { success: true, data: true }
    } catch (err) {
      const errorResult = handleError(err, '게시판 삭제에 실패했습니다.')
      error.value = errorResult
      return { success: false, error: errorResult }
    } finally {
      loading.value = false
    }
  }

  return {
    // state
    boards,
    board,
    loading,
    error,

    // actions
    fetchBoardList,
    fetchBoard,
    createBoard,
    updateBoard,
    deleteBoard,
  }
})
