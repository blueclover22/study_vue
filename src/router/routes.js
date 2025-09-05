import { HomeRouter } from './home.js'
import { AuthRouter } from './auth.js'

const routes = [
    ...HomeRouter,
    ...AuthRouter
]

export default routes