<template>
<div class="navbar">
  <div>Vue 3</div>
  <div class="navbar__btns">
    <my-button @click="goToPostsPage">Posts</my-button>
    <my-button @click="goToAboutPage">About</my-button>
    <my-button @click="goToPostsPageWithStore">Posts With Store</my-button>
    <my-button @click="goToPostsPageWithCompositionAPI">Posts With Composition API</my-button>
  </div>
</div>

</template>

<script>
import router from "@/router/router";

export default {
  name: 'NavBar',
  methods: {
    goToPostsPage(){
      router.push('/posts');
   },
    goToAboutPage(){
      router.push('/about');
    },
    goToPostsPageWithStore(){
      router.push('/store');
    },
    goToPostsPageWithCompositionAPI(){
      router.push('/compositionApi');
    }

  }
}

</script>

<style scoped>
.navbar{
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px  4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar__btns {
  margin-left: auto;
}
</style>