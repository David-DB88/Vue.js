import {computed, ref} from "vue";


export function useSortedPosts(posts){
    const selectedSort = ref('')
    const sortedPosts = computed(()=>{
        return [...posts.value].sort((post1, post2)=>{
            return post1[selectedSort.value]?.localeCompare(post2[sortedPosts.value])
        })
    })
    return {
        selectedSort, sortedPosts
    }
}