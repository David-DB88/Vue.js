<template>
  <div v-if="posts.length > 0">
    <h3> list of Posts</h3>
    <transition-group name="post-list" tag="p">
    <post-item class="post" v-for="post in posts" :post="post" :key="post.id" @remove="$emit('remove', post)"/>
    </transition-group>
  </div>
  <div v-else style="color: red; text-align: center">
    there is no any post
  </div>
</template>

<script>
import PostItem from "@/components/PostItem";
export default {
  name: "PostList",
  components: {PostItem},
  props: {
    posts: {
      type: Array,
      required: true
    }
      }
}
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
}
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-active, .post-list-leave-active {
  transition: all 1s;
}
.post-list-enter, .post-list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.post-list-move {
  transition: transform 1s;
}
</style>