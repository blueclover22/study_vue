<template>
  <div>
    <table>
      <tbody>
        <tr>
          <td>번호</td>
          <td>
            <input type="text" :value="member.userNo" disabled />
          </td>
        </tr>
        <tr>
          <td>아이디</td>
          <td>
            <input type="text" :value="member.userId" disabled />
          </td>
        </tr>
        <tr>
          <td>사용자명</td>
          <td>
            <input type="text" :value="member.userName" disabled />
          </td>
        </tr>
        <tr>
          <td>직업</td>
          <td>
            <input type="text" :value="member.job" disabled />
          </td>
        </tr>
        <tr>
          <td>권한</td>
          <td>
            <select :value="auth" disabled>
              <option value="ROLE_USER">사용자</option>
              <option value="ROLE_MEMBER">회원</option>
              <option value="ROLE_ADMIN">관리자</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'MemberReadForm',
  props: {
    member: {
      type: Object,
      required: true,
    },
    jobCodes: {
      type: Array,
    },
  },

  setup(props) {
    const auth = ref(props.member.authList?.[0]?.auth || '')

    return {
      auth,
    }
  },
}
</script>
