<template>
  <form @submit.prevent="signup">
    <table>
      <tbody>
        <tr>
          <td>아이디</td>
          <td><input type="text" v-model="userId" /></td>
        </tr>
        <tr>
          <td>비밀번호</td>
          <td><input type="password" v-model="userPw" /></td>
        </tr>
        <tr>
          <td>이름</td>
          <td><input type="text" v-model="userName" /></td>
        </tr>
        <tr>
          <td>직업</td>
          <td>
            <select v-model="job">
              <option v-for="jobCode in jobCodes" :key="jobCode.value" :value="jobCode.value">
                {{ jobCode.value }}
              </option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>

    <div>
      <button type="submit">회원가입</button>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'SignupForm',

  props: {
    jobCodes: {
      type: Array,
    },
  },

  emits: ['sign-up'],

  setup(props, context) {
    const userId = ref('')
    const userPw = ref('')
    const userName = ref('')
    const job = ref('')

    const signup = () => {
      context.emit('sign-up', {
        userId: userId.value,
        userPw: userPw.value,
        userName: userName.value,
        job: job.value,
      })
    }

    return {
      userId,
      userPw,
      userName,
      job,
      signup,
    }
  },
}
</script>
