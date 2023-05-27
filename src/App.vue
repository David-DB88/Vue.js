<template>
<NavBar></NavBar>
  <div class="app">
<router-view></router-view>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  components: {
    NavBar
  },
  name: "Main"
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  padding: 20px;
}
</style>>