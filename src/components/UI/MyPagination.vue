<template>
  <div class="pages" :class="{'current-page':  currentPage === page }" v-for="page in totalPages" @click="changPage(page)">{{page}}</div>
</template>

<script>
export default {
  name: "my-pagination",
  emits: ['updatePage'],
  props: {
    currentPage: {
      type: Number
    },
    totalPages: {
      type: Number
    }
  },
  methods: {
    changPage(page){
      this.$emit('updatePage',page)
    }
  }


}
</script>

<style scoped>

.pages {
  padding: 5px;
  border: 1px solid teal;
  cursor: pointer;
}
.current-page {
  border: 2px solid blueviolet;
}
</style>