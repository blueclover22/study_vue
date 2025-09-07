<template>
  <div align="center">
    <h2>코드그룹 수정</h2>
    <code-group-modify-form v-if="codeGroup" :codeGroup="codeGroup" @modify-post="modifyPost" />
    <p v-else>Loading...</p>
  </div>
</template>

<script>
import CodeGroupModifyForm from '@/components/codeGroup/CodeGroupModifyForm.vue'
import client from '@/modules/client'
import { inject, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router/router'

export default {
  name: 'CodeGroupModify',
  components: { CodeGroupModifyForm },
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

    const modifyPost = (payload) => {
      const { groupName } = payload

      client
        .put(`/codeGroups/${groupCode}`, { groupName })
        .then((response) => {
          alert('수정 완료')
          console.log(response.data)
          router.push({ name: 'CodeGroupReadRouter', params: { groupCode: groupCode } })
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
      modifyPost
    }
  }
}
</script>
