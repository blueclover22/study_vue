import { HomeRouter } from '@/router/home.js'
import { AuthRouter } from '@/router/auth.js'
import { MemberRouter } from '@/router/member.js'
import { CodeGroupRouter } from '@/router/codegroup.js'

const routes = [
    ...HomeRouter,
    ...AuthRouter,
    ...MemberRouter,
    ...CodeGroupRouter
]

export default routes