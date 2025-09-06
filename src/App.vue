<template>
  <router-view name="header" />
  <router-view name="menu" />
  <router-view />
  <router-view name="footer" />
</template>

<script>

export default {
  name: 'App',
}
</script>
