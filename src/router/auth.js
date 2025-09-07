import Signin from '@/views/auth/Signin.vue'
import HomeHeader from '@/components/common/HomeHeader.vue'
import Footer from '@/components/common/Footer.vue'

export const AuthRouter = [
  {
    path: '/auth/signin',
    name: 'SigninRouter',
    components: {
      header: HomeHeader,
      footer: Footer,
      default: Signin,
    },
  },
]
