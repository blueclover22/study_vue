import { reactive, computed } from 'vue'
import client from '../modules/client'

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
    }
  }

  const SET_MY_INFO = (myinfo) => {
    if (myinfo) {
      auth.myinfo = myinfo
    }
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

        return client.get('/users/myInfo')
          .then((response) => {
            SET_MY_INFO(response.data)
          })
      })
  }

  return {
    signin,
    isAuthorized,
    myinfo,
    isAdmin,
    isMember,
  }
}
