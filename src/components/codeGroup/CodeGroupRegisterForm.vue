<template>
  <form @submit.prevent="fireAddPost">
    <table>
      <tbody>
        <tr>
          <td>코드그룹코드</td>
          <td>
            <input type="text" v-model="groupCode" />
          </td>
        </tr>
        <tr>
          <td>코드그룹명</td>
          <td>
            <input type="text" v-model="groupName" />
          </td>
        </tr>
      </tbody>
    </table>

    <div>
      <button type="submit">등록</button>
      <router-link :to="{ name: 'CodeGroupListRouter' }">목록</router-link>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'CodeGroupRegisterForm',

  emits: ['add-post'],

  setup(props, context) {
    const groupCode = ref('')
    const groupName = ref('')

    const fireAddPost = () => {
      context.emit('add-post', { groupCode: groupCode.value, groupName: groupName.value })
    }

    return {
      groupCode,
      groupName,
      fireAddPost,
    }
  },
}
</script>
