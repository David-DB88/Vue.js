<template>
  <form @submit.prevent>
    <h4>Create Post 31 minute</h4>
    <my-input v-focus v-model="post.title"  placeholder="Name" />
    <my-input v-model="post.body"   placeholder="Description" />
    <my-button style="align-self: self-end; margin-top: 15px" @click="createPost">Create</my-button>
  </form>

</template>

<script>

export default {
  name: "PostForm",
  data(){
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost() {
      this.$emit('create', this.post),
      this.post = {
        title: '',
        body: ''
      }

    }
  }
}
</script>

<style scoped>


</style>