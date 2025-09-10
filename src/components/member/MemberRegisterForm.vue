<template>
  <form @submit.prevent="fireAddPost">
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
          <td>사용자명</td>
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
      <button type="submit">등록</button>
      <router-link :to="{ name: 'MemberListRouter' }">목록</router-link>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'MemberRegisterForm',
  props: {
    jobCodes: {
      type: Array,
    },
  },

  emits: ['add-post'],

  setup(props, context) {
    const userId = ref('')
    const userPw = ref('')
    const userName = ref('')
    const job = ref('00')

    const fireAddPost = () => {
      context.emit('add-post', {
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
      fireAddPost,
    }
  },
}
</script>
