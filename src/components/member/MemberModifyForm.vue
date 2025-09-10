<template>
  <form @submit.prevent="fireModifyPost">
    <table>
      <tbody>
        <tr>
          <td>번호</td>
          <td>
            <input type="text" :value="Member.userNo" disabled />
          </td>
        </tr>
        <tr>
          <td>아이디</td>
          <td>
            <input type="text" :value="Member.userId" disabled />
          </td>
        </tr>
        <tr>
          <td>사용자명</td>
          <td>
            <input type="text" :value="Member.userName" disabled />
          </td>
        </tr>
        <tr>
          <td>직업</td>
          <td>
            <select v-model="job">
              <option v-for="jobCode in jobCodes" :key="jobCode.value" :value="jobCode.value">
                {{ jobCode.label }}
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <td>권한</td>
          <td>
            <select v-model="auth">
              <option value="" selected="selected">select</option>
              <option value="ROLE_USER">사용자</option>
              <option value="ROLE_MEMBER">회원</option>
              <option value="ROLE_ADMIN">관리자</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>

    <div>
      <button type="submit">수정</button>
      <router-link :to="{ name: 'MemberReadRouter', params: { userNo: Member.userNo } }"
        >취소</router-link
      >
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'MemberModifyForm',
  props: {
    Member: {
      type: Object,
      required: true,
    },
    jobCodes: {
      type: Array,
    },
  },

  emits: ['modify-post'],

  setup(props, context) {
    const job = ref(props.Member.job)
    const auth = ref(props.Member.authList?.[0]?.auth || '')

    const fireModifyPost = () => {
      const authList = auth.value
        ? [
            {
              userNo: props.Member.userNo,
              auth: auth.value,
            },
          ]
        : []

      context.emit('modify-post', {
        userNo: props.Member.userNo,
        userId: props.Member.userId,
        userPw: props.Member.userPw,
        userName: props.Member.userName,
        job: job.value,
        authList: authList,
      })
    }

    return {
      job,
      auth,
      fireModifyPost,
    }
  },
}
</script>
