<template>
  <div>
    <table>
      <tbody>
        <tr>
          <td>그룹코드</td>
          <td>
            <select :value="codeDetail.groupCode" disabled>
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
            <input type="text" :value="codeDetail.codeValue" readonly />
          </td>
        </tr>
        <tr>
          <td>코드명</td>
          <td>
            <input type="text" :value="codeDetail.codeName" readonly />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'CodeDetailReadForm',
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
}
</script>
