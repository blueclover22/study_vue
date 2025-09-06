<template>
  <div align="center">
    <table>
      <tbody>
        <tr>
          <td width="120">
            <router-link :to="{name: 'HomeRouter'}">Home</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

console.log('MenuBar.vue in');

export default {  
  name: 'MenuBar',
}
</script>
