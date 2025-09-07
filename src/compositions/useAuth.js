// 이 파일은 Pinia 마이그레이션 후 제거될 예정

import { reactive, computed } from 'vue'
import client from '@/modules/client'
import Cookies from 'js-cookie'

export const useAuth = () => {
  const auth = reactive({
    accessToken: '',
    myinfo: null,
  })
  const myinfo = computed(() => auth.myinfo)

  const isAuthorized = computed(() => {
    return auth.accessToken.length > 0 && !!auth.myinfo
  })

  const isAdmin = computed(() => {
    if (!auth.myinfo || !auth.myinfo.authList) {
      return false
    }
    return isAuthorized.value && auth.myinfo.authList[0].auth === 'ROLE_ADMIN'
  })

  const isMember = computed(() => {
    if (!auth.myinfo || !auth.myinfo.authList) {
      return false
    }
    return isAuthorized.value && auth.myinfo.authList[0].auth === 'ROLE_MEMBER'
  })

  const SET_ACCESS_TOKEN = (accessToken) => {
    if (accessToken) {
      auth.accessToken = accessToken

      client.defaults.headers.common.Authorization = `Bearer ${accessToken}`

      Cookies.set('accessToken', accessToken, { expires: 1 })
    }
  }

  const SET_MY_INFO = (myinfo) => {
    if (myinfo) {
      auth.myinfo = myinfo
    }
  }

  const DESTROY_ACCESS_TOKEN = () => {
    auth.accessToken = ''
    delete client.defaults.headers.common.Authorization
    Cookies.remove('accessToken')
  }

  const DESTROY_MY_INFO = () => {
    auth.myinfo = null
  }

  const signin = (payload) => {
    const formData = new URLSearchParams()
    formData.append('username', payload.userId)
    formData.append('password', payload.password)

    return client
      .post('/api/authenticate', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => {
        const { authorization } = response.headers
        const accessToken = authorization.substring(7)
        SET_ACCESS_TOKEN(accessToken)

        return client.get('/users/myInfo').then((response) => {
          SET_MY_INFO(response.data)
        })
      })
  }

  const signout = () => {
    DESTROY_ACCESS_TOKEN()
    DESTROY_MY_INFO()
  }

  const signinByToken = (token) => {
    SET_ACCESS_TOKEN(token)
    return client.get('/users/myInfo').then((response) => {
      SET_MY_INFO(response.data)
    })
  }

  return {
    signin,
    isAuthorized,
    myinfo,
    isAdmin,
    isMember,
    signinByToken,
    signout,
  }
}
