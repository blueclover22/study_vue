<template>
  <div align="center">
    <h2>코드그룹 상세조회</h2>
    <code-group-read-form v-if="codeGroup" :codeGroup="codeGroup" />
    <router-link :to="{ name: 'CodeGroupModifyRouter', params: { groupCode } }">수정</router-link>
    <button @click="deletePost">삭제</button>
    <router-link :to="{ name: 'CodeGroupListRouter' }">목록</router-link>
  </div>
</template>

<script>
import client from '@/modules/client'
import { inject, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router/router'
import CodeGroupReadForm from '@/components/codeGroup/CodeGroupReadForm.vue'

export default {
  name: 'CodeGroupRead',
  components: { CodeGroupReadForm },
  setup() {
    const route = useRoute()
    const codeGroup = inject('codeGroup')
    const fetchCodeGroup = inject('fetchCodeGroup')
    const groupCode = route.params.groupCode
    
    onMounted(() => {
      if (groupCode) {
        fetchCodeGroup(groupCode).catch((error) => {
          alert(error.response.data.message)
          router.back()
        })
      }
    })

    const deletePost = () => {
      const { groupCode } = codeGroup.value
      client
        .delete(`/codeGroups/${groupCode}`)
        .then((response) => {
          alert('삭제 완료')
          console.log(response.data)
          router.push({ name: 'CodeGroupListRouter' })
        })
        .catch((error) => {
          if (error.response.status === 401) {
            alert('로그인 필요')
            router.push({ name: 'SigninRouter' })
          } else if (error.response.status === 403) {
            alert('접근 권한이 없습니다.')
            router.back()
          } else {
            alert(error.response.data.message)
          }
        })
    }
    
    return {
      codeGroup,
      groupCode,
      deletePost
    }
  }
}
</script>
