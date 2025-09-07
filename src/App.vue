<template>
  <router-view name="header" />
  <router-view name="menu" />
  <router-view />
  <router-view name="footer" />
</template>

<script>
import { provide, onMounted } from 'vue'
import { useAuth } from '@/compositions/useAuth'
import { useCodeGroup } from '@/compositions/useCodeGroup'
import Cookies from 'js-cookie'

export default {
  name: 'App',
  setup() {
    const { isAuthorized, myinfo, isAdmin, isMember, signin, signinByToken, signout } = useAuth()
    const { codeGroups, codeGroup, fetchCodeGroupList, fetchCodeGroup } = useCodeGroup()

    provide('isAuthorized', isAuthorized)
    provide('myinfo', myinfo)
    provide('isAdmin', isAdmin)
    provide('isMember', isMember)
    provide('signin', signin)
    provide('signout', signout)
    provide('codeGroups', codeGroups)
    provide('codeGroup', codeGroup)
    provide('fetchCodeGroupList', fetchCodeGroupList)
    provide('fetchCodeGroup', fetchCodeGroup)

    onMounted(() => {
      const accessToken = Cookies.get('accessToken')
      if (accessToken) {
        signinByToken(accessToken)
          .then(() => {
            console.log('Logined By Token')
          })
          .catch((error) => {
            console.log(error.response.data)
          })
      }
    })
  },
}
</script>
