<template>
  <router-view name="header" />
  <router-view name="menu" />
  <router-view />
  <router-view name="footer" />
</template>

<script>

console.log('App.vue in');

export default {
  name: 'App',
}
</script>
