import MainHeader from '@/components/common/MainHeader.vue'
import MenuBar from '@/components/common/MenuBar.vue'
import Footer from '@/components/common/Footer.vue'
import CodeDetailList from '@/views/codeDetail/CodeDetailList.vue'
import CodeDetailRead from '@/views/codeDetail/CodeDetailRead.vue'
import CodeDetailModify from '@/views/codeDetail/CodeDetailModify.vue'
import CodeDetailRegister from '@/views/codeDetail/CodeDetailRegister.vue'

export const CodeDetailRouter = [
  {
    path: '/codeDetail',
    name: 'CodeDetailListRouter',
    components: {
      header: MainHeader,
      menu: MenuBar,
      footer: Footer,
      default: CodeDetailList,
    },
  },
  {
    path: '/codeDetail/:groupCode/:codeValue',
    name: 'CodeDetailReadRouter',
    components: {
      header: MainHeader,
      menu: MenuBar,
      footer: Footer,
      default: CodeDetailRead,
    },
  },
  {
    path: '/codeDetail/:groupCode/:codeValue/modify',
    name: 'CodeDetailModifyRouter',
    components: {
      header: MainHeader,
      menu: MenuBar,
      footer: Footer,
      default: CodeDetailModify,
    },
  },
  {
    path: '/codeDetail/register',
    name: 'CodeDetailRegisterRouter',
    components: {
      header: MainHeader,
      menu: MenuBar,
      footer: Footer,
      default: CodeDetailRegister,
    },
  },
]
