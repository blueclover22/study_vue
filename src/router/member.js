import AdminSetup from '@/views/member/AdminSetup.vue'
import MainHeader from '@/components/common/MainHeader.vue'
import MenuBar from '@/components/common/MenuBar.vue'
import Footer from '@/components/common/Footer.vue'


export const MemberRouter = [
  {
    path: '/user/setup',
    name: 'AdminSetupRouter',
    components: {
      header: MainHeader,
      menu: MenuBar,
      footer: Footer,
      default: AdminSetup,
    },
  },
]