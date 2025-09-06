import { HomeRouter } from './home.js'
import { AuthRouter } from './auth.js'
import { MemberRouter } from './member.js'

const routes = [
    ...HomeRouter,
    ...AuthRouter,
    ...MemberRouter
]

export default routes