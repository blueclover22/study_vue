<template>
  <div align="center">
    <h1>Home</h1>
    <p>{{ getServerTime() }}</p>
  </div>
</template>

<script>

console.log('Home.vue in');

export default {
  name: 'HomeComponent',

  setup() {
    const getServerTime = () => {
      return new Date().toLocaleString()
    }

    return {
      getServerTime,
    }
  },
}
</script>
