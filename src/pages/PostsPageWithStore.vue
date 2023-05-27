<template>
  <div >
    <div>Posts Page</div>

    <div class="app__btns">
      <my-button @click="showModal">Create Post</my-button>
      <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions" />
    </div>
    <div>
      <h3>Search</h3>
      <my-input v-focus :model-value="searchedValue" @update:model-value="setSearchedValue" placeholder="Search . . ."/>
    </div>

    <my-dialog v-model:show="visibleModal" >
      <post-form @create="createPost"/>
    </my-dialog>

    <post-list :posts="searchedSortedValue" @remove="removePost" v-if="!isLoadingPosts"/>

    <div v-else style="font-size: 35px; align-items: center" >Loading . . .</div>

    <div v-intersection="loadMorePosts" class="observer"></div>
    <!--  <div class="pagination">-->
    <!--    <my-pagination :currentPage="currentPage" :totalPages="totalPages" @updatePage="changPage" />-->
    <!--  </div>-->
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import PostForm from "@/components/PostForm";
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  components: {
    PostList, PostForm
  },
  data() {
    return {
      visibleModal: false,
    }
  },
  methods: {
    ...mapMutations({
      setCurrentPage: 'post/setCurrentPage',
      setSearchedValue: 'post/setSearchedValue',
      setSelectedSort: 'post/setSelectedSort'
    }),
    ...mapActions({
      fetchPosts: 'post/fetchPosts',
      loadMorePosts: 'post/loadMorePosts'
    }),



    createPost({ title, body}) {
      const newPost = {
        id: this.posts.length? this.posts[this.posts.length-1].id + 1: new Date(),
        title: title,
        body: body,
      }
      this.posts.push(newPost)
      this.visibleModal = false
    },
    removePost(post){
      this.posts =  this.posts.filter(p => p.id !== post.id)
    },
    showModal(){
      this.visibleModal= true
    },
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
   ...mapState({
     posts: state => state.post.posts,
     isLoadingPosts: state => state.post.isLoadingPosts,
     selectedSort: state => state.post.selectedSort,
     currentPage: state => state.post.currentPage,
     limit: state => state.post.limit,
     totalPages: state => state.post.totalPages,
     sortOptions: state => state.post.sortOptions,
     searchedValue: state => state.post.searchedValue,
   }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      searchedSortedValue: 'post/searchedSortedValue'
    })
  },
  watch: {
    // currentPage(){
    //   this.fetchPosts()
    // }
  }
}
</script>

<style>

form {
  display: flex;
  flex-direction: column;
}
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
.pagination {
  display: flex;
  padding-top: 15px;
}
.observer {
  margin-top: 10px;
  height: 30px;
}
</style>