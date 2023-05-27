<template>
  <div >
    <div>Posts Page</div>
    <div class="app__btns">
      <my-button @click="showModal">Create Post</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <div>
      <h3>Search</h3>
      <my-input v-focus v-model="searchedValue" placeholder="Search . . ."/>
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
import axios from "axios";
export default {
  components: {
    PostList, PostForm
  },
  data() {
    return {
      posts: [],
      visibleModal: false,
      isLoadingPosts: false,
      selectedSort: '',
      currentPage: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        {value: 'title', name: "Name"},
        {value: 'body', name: "Description"}
      ],
      searchedValue: ''
    }
  },
  methods: {
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
    async fetchPosts(){
      try {
        this.isLoadingPosts = true
        const response =  await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.currentPage,
            _limit: this.limit
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count']) / this.limit
        this.posts = response.data
      }catch (e){
        alert('Some error')
      }finally {
        this.isLoadingPosts = false
      }
    },
    async loadMorePosts(){
      try {
        this.currentPage += 1
        const response =  await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.currentPage,
            _limit: this.limit
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count']) / this.limit
        this.posts = [...this.posts, ...response.data]
      }catch (e){
        alert('Some error')
      }finally {
      }
    },
    // changPage(currentPage){
    //   this.currentPage = currentPage
    //
    // }
  },
  mounted() {
    this.fetchPosts()

    // let options = {
    //   rootMargin: "0px",
    //   threshold: 1.0,
    // };
    // let callback = (entries, observer) => {
    //   if (entries[0].isIntersecting && this.currentPage < this.totalPages)
    //     this.loadMorePosts()
    // };
    //
    // let observer = new IntersectionObserver(callback, options);
    //
    // observer.observe(this.$refs.observer)
  },
  computed: {
    sortedPosts(){
      return [...this.posts].sort((post1, post2)=>{
        return post1[this.selectedSort]?.localeCompare(post2[this.sortedPosts])
      })
    },
    searchedSortedValue(){
      return this.sortedPosts?.filter(post =>post.title.toLocaleLowerCase().includes(this.searchedValue.toLocaleLowerCase()))
    }
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