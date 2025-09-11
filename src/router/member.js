import AdminSetup from '@/views/member/AdminSetup.vue'
import MainHeader from '@/components/common/MainHeader.vue'
import MenuBar from '@/components/common/MenuBar.vue'
import Footer from '@/components/common/Footer.vue'

import MemberList from '@/views/member/MemberList.vue'
import MemberRegister from '@/views/member/MemberRegister.vue'
import MemberRead from '@/views/member/MemberRead.vue'
import MemberModify from '@/views/member/MemberModify.vue'

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
  {
    path: '/user',
    name: 'MemberListRouter',
    components: {
      header: MainHeader,
      menu: MenuBar,
      footer: Footer,
      default: MemberList,
    },
  },
  {
    path: '/user/:userNo',
    name: 'MemberReadRouter',
    components: {
      header: MainHeader,
      menu: MenuBar,
      footer: Footer,
      default: MemberRead,
    },
  },
  {
    path: '/user/:userNo/modify',
    name: 'MemberModifyRouter',
    components: {
      header: MainHeader,
      menu: MenuBar,
      footer: Footer,
      default: MemberModify,
    },
  },
  {
    path: '/user/register',
    name: 'MemberRegisterRouter',
    components: {
      header: MainHeader,
      menu: MenuBar,
      footer: Footer,
      default: MemberRegister,
    },
  },
]
