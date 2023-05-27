import {computed, ref} from "vue";


export function useSortedSearchedPosts(sortedPosts){
    const searchedValue = ref('')
    const searchedPosts = computed(()=>{
        return  sortedPosts.value?.filter(post =>post.title.toLocaleLowerCase().includes(searchedValue.value.toLocaleLowerCase()))
    })

    return {searchedPosts, searchedValue}
}