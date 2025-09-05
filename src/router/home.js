import Home from '../views/Home.vue'
import MainHeader from '../components/common/MainHeader.vue'
import MenuBar from '../components/common/MenuBar.vue'
import MainFooter from '../components/common/Footer.vue'

export const HomeRouter = [
  {
    path: '/',
    name: 'HomeRouter',
    components: {
      header: MainHeader,
      menu: MenuBar,
      footer: MainFooter,
      default: Home,
    },
  },
]
