<template>
  <div align="center">
    <table>
      <tbody>
        <tr>
          <template v-if="isAuthorized">
            <template v-if="isAdmin">
              <td width="120">
                <router-link :to="{ name: 'HomeRouter' }">Home</router-link>
              </td>
              <td width="120">
                <router-link :to="{ name: 'CodeGroupListRouter' }">CodeGroup</router-link>
              </td>
            </template>
            <template v-else>
              <td width="120">
                <router-link :to="{ name: 'HomeRouter' }">Home</router-link>
              </td>
            </template>
          </template>
          <template v-else>
            <td width="120">
              <router-link :to="{ name: 'HomeRouter' }">Home</router-link>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'MenuBar',
  setup() {
    const isAuthorized = inject('isAuthorized')
    const isAdmin = inject('isAdmin')

    return {
      isAuthorized,
      isAdmin,
    }
  },
}
</script>
