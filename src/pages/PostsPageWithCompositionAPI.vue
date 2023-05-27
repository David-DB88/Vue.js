<template>
  <div >
    <div>Posts Page</div>
    <div class="app__btns">
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <div>
      <h3>Search</h3>
      <my-input v-focus v-model="searchedValue" placeholder="Search . . ."/>
    </div>

    <my-dialog v-model:show="visibleModal" >
    </my-dialog>

    <post-list :posts="searchedPosts"  v-if="!isLoadingPosts"/>

    <div v-else style="font-size: 35px; align-items: center" >Loading . . .</div>

  </div>
</template>

<script>
import PostList from "@/components/PostList";
import PostForm from "@/components/PostForm";
import {usePosts} from "@/components/hooks/usePosts";
import {useSortedPosts} from "@/components/hooks/useSortedPosts";
import {useSortedSearchedPosts} from "@/components/hooks/useSortedSearchedPosts";
export default {
  components: {
    PostList, PostForm
  },
  data() {
    return {
      visibleModal: false,
      sortOptions: [
        {value: 'title', name: "Name"},
        {value: 'body', name: "Description"}
      ],
    }
  },
  setup(props){
    const {posts,totalPages, isLoadingPosts} = usePosts(10)
    const {selectedSort, sortedPosts} = useSortedPosts(posts)
    const {searchedPosts, searchedValue} = useSortedSearchedPosts(sortedPosts)

    return {
      posts,
      totalPages,
      isLoadingPosts,
      selectedSort,
      sortedPosts,
      searchedPosts,
      searchedValue
    }
  },
  watch: {
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
</style>