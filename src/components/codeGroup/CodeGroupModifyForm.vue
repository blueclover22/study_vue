<template>
  <form @submit.prevent="fireModifyPost">
    <table>
      <tbody>
        <tr>
          <td>코드그룹코드</td>
          <td>
            <input type="text" :value="codeGroup.groupCode" disabled />
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
      <button type="submit">수정</button>
      <router-link :to="{ name: 'CodeGroupReadRouter', params: { groupCode: codeGroup.groupCode } }"
        >취소</router-link
      >
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'CodeGroupModifyForm',
  props: {
    codeGroup: {
      type: Object,
      required: true,
    },
  },

  emits: ['modify-post'],

  setup(props, context) {
    const groupName = ref(props.codeGroup.groupName)

    const fireModifyPost = () => {
      context.emit('modify-post', {
        groupCode: props.codeGroup.groupCode,
        groupName: groupName.value,
      })
    }

    return {
      groupName,
      fireModifyPost,
    }
  },
}
</script>
