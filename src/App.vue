<template>
  <router-view name="header" />
  <router-view name="menu" />
  <router-view />
  <router-view name="footer" />
</template>

<script>
import { provide } from 'vue'
import { useAuth } from './compositions/useAuth'

export default {
  name: 'App',
  setup() {
    const { isAuthorized, myinfo, isAdmin, isMember, signin } = useAuth()
    provide('isAuthorized', isAuthorized)
    provide('myinfo', myinfo)
    provide('isAdmin', isAdmin)
    provide('isMember', isMember)
    provide('signin', signin)
  },
}
</script>
