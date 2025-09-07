<template>
  <div align="center">
    <table>
      <tbody>
        <tr>
          <template v-if="authStore.isAuthorized">
            <template v-if="authStore.isAdmin">
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
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'MenuBar',
  setup() {
    const authStore = useAuthStore()

    return {
      // 스토어 자체를 반환하여 반응성 유지
      authStore,
    }
  },
}
</script>
