<template>
  <div>
    <table border="1">
      <tbody>
        <tr>
          <th align="center" width="160">코드그룹코드</th>
          <th align="center" width="160">코드그룹명</th>
          <th align="center" width="160">등록일시</th>
        </tr>

        <tr v-if="!codeGroups || (Array.isArray(codeGroups) && codeGroups.length === 0)">
          <td colspan="3" align="center">데이터가 없습니다.</td>
        </tr>

        <tr v-else v-for="codeGroup in codeGroups" :key="codeGroup.groupCode">
          <td align="center">{{ codeGroup.groupCode }}</td>
          <td align="left">
            <router-link :to="{ name: 'CodeGroupReadRouter', params: { groupCode: codeGroup.groupCode } }">{{ codeGroup.groupName }}</router-link>
          </td>
          <td align="center">{{ codeGroup.regDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'CodeGroupListForm',
  props: {
    codeGroups: {
      type: Array
    },
  },
}
</script>
