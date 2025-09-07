import MainHeader from '@/components/common/MainHeader.vue'
import MenuBar from '@/components/common/MenuBar.vue'
import Footer from '@/components/common/Footer.vue'
import CodeGroupList from '@/views/codeGroup/CodeGroupList.vue'
import CodeGroupRead from '@/views/codeGroup/CodeGroupRead.vue'
import CodeGroupModify from '@/views/codeGroup/CodeGroupModify.vue'
import CodeGroupRegister from '@/views/codeGroup/CodeGroupRegister.vue'

export const CodeGroupRouter = [
  {
    path: '/codeGroup',
    name: 'CodeGroupListRouter',
    components: {
      header: MainHeader,
      menu: MenuBar,
      footer: Footer,
      default: CodeGroupList,
    },
  },
  {
    path: '/codeGroup/:groupCode',
    name: 'CodeGroupReadRouter',
    components: {
      header: MainHeader,
      menu: MenuBar,
      footer: Footer,
      default: CodeGroupRead,
    },
  },
  {
    path: '/codeGroup/:groupCode/modify',
    name: 'CodeGroupModifyRouter',
    components: {
      header: MainHeader,
      menu: MenuBar,
      footer: Footer,
      default: CodeGroupModify,
    },
  },
  {
    path: '/codeGroup/register',
    name: 'CodeGroupRegisterRouter',
    components: {
      header: MainHeader,
      menu: MenuBar,
      footer: Footer,
      default: CodeGroupRegister,
    },
  },
]
