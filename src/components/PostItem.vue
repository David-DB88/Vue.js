<template>
  <div class="post">
    <div>
      <div><strong>name: </strong>Post of {{post.title}}</div>
      <div><strong>description: </strong>JavaScript is a {{post.body}}</div>
    </div>
  <div class="post__btns">
    <my-button @click="$emit('remove', post)">delete</my-button>
  </div>
  </div>
</template>

<script>
export default {
  name: "PostItem",
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.post {
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>