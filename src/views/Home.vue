<template>
  <div align="center">
    <h1>Home</h1>
    <p>{{ getServerTime() }}</p>
  </div>
</template>

<script>
export default {

  name: 'HomePage',
  
  setup() {

    const getServerTime = () => {
      return new Date().toLocaleString();
    }

    return {
      getServerTime
    }
  }
}
</script>