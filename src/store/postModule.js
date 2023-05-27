import axios from "axios";


export const postModule = {
    state: ()=>({
        posts: [],
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
    }),
    getters: {
        sortedPosts(state){
            return [...state.posts].sort((post1, post2)=>{
                return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
            })
        },
        searchedSortedValue(state, getters){
            return getters.sortedPosts?.filter(post =>post.title.toLocaleLowerCase().includes(state.searchedValue.toLocaleLowerCase()))
        }
    },
    mutations: {
     setPosts(state, posts){
        state.posts = posts
     },
     setLoading(state, bool){
        state.isLoadingPosts = bool
     },
     setSelectedSort(state, selectedSort){
        state.selectedSort = selectedSort
     },
     setCurrentPage(state, currentPage){
        state.currentPage = currentPage
     },
     setTotalPages(state, totalPages){
        state.totalPages = totalPages
     },
     setSearchedValue(state, searchedValue){
        state.searchedValue = searchedValue
     }
    },
    actions: {
        async fetchPosts({state, commit}){
            try {
                commit('setLoading', true)
                const response =  await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.currentPage,
                        _limit: state.limit
                    }
                })
                commit('setTotalPages',Math.ceil(response.headers['x-total-count']) / state.limit)
                commit("setPosts",response.data)
            }catch (e){
                console.log(111, e)
            }finally {
                commit('setLoading', false)
            }
        },
        async loadMorePosts({state, commit}){
            try {
                commit('setCurrentPage', state.currentPage += 1)
                const response =  await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.currentPage,
                        _limit: state.limit
                    }
                })
                commit('setTotalPages', Math.ceil(response.headers['x-total-count']) / state.limit)
                commit('setPosts',  [...state.posts, ...response.data])
            }catch (e){
                console.log(222, e)
            }finally {
            }
        },
    },
    namespaced: true
}
