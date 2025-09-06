import  axios  from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8080', // 서버 주소 (springboot)
})

export default client