<template>
  <form @submit.prevent="fireModifyPost">
    <table>
      <tbody>
        <tr>
          <td>그룹코드</td>
          <td>
            <select v-model="groupCode" disabled>
              <option
                v-for="codeGroup in codeGroups"
                :key="codeGroup.groupCode"
                :value="codeGroup.groupCode"
              >
                {{ codeGroup.groupName }}
              </option>
            </select>
          </td>
        </tr>

        <tr>
          <td>코드값</td>
          <td>
            <input type="text" v-model="codeValue" />
          </td>
        </tr>

        <tr>
          <td>코드명</td>
          <td>
            <input type="text" v-model="codeName" />
          </td>
        </tr>
      </tbody>
    </table>

    <div>
      <button type="submit">수정</button>
      <router-link
        :to="{
          name: 'CodeDetailReadRouter',
          params: { groupCode: codeDetail.groupCode, codeValue: codeDetail.codeValue },
        }"
        >취소</router-link
      >
    </div>
  </form>
</template>

<script>
import { ref} from 'vue'

export default {
  name: 'CodeDetailModifyForm',
  props: {
    codeDetail: {
      type: Object,
      required: true,
    },
    codeGroups: {
      type: Array,
      required: true,
    },
  },

  emits: ['modify-post'],

  setup(props, context) {
    const groupCode = ref(props.codeDetail.groupCode)
    const codeValue = ref(props.codeDetail.codeValue)
    const codeName = ref(props.codeDetail.codeName)


    const fireModifyPost = () => {
      context.emit('modify-post', {
        groupCode: groupCode.value,
        codeValue: codeValue.value,
        codeName: codeName.value,
      })
    }

    return {
      fireModifyPost,
      groupCode,
      codeValue,
      codeName,
    }
  },
}
</script>
