<template>
  <form @submit.prevent="fireResgisterAdmin">
    <table>
      <tbody>
        <tr>
          <td>관리자 아이디 :</td>
          <td>
            <input type="text" v-model="userId" />
          </td>
        </tr>
        <tr>
          <td>관리자 비밀번호 :</td>
          <td>
            <input type="text" v-model="userPw" />
          </td>
        </tr>
        <tr>
          <td>관리자 이름 :</td>
          <td>
            <input type="text" v-model="userName" />
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <button type="submit">등록</button>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AdminSetupFormComponent',
  emits: ['register-admin'],

  setup(props, context) {
    const userId = ref('')
    const userPw = ref('')
    const userName = ref('')

    const fireResgisterAdmin = () => {
      context.emit('register-admin', {
        userId: userId.value,
        userPw: userPw.value,
        userName: userName.value,
      })
    }

    return {
      userId,
      userPw,
      userName,
      fireResgisterAdmin,
    }
  },
}
</script>
