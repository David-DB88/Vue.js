import Main from "@/pages/Main";
import {createRouter, createWebHistory} from "vue-router";
import PostsPage from "@/pages/PostsPage";
import About from "@/pages/About";
import PostsPageWithStore from "@/pages/PostsPageWithStore";
import PostsPageWithCompositionAPI from "@/pages/PostsPageWithCompositionAPI";


const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostsPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/store',
        component: PostsPageWithStore
    },
    {
        path: '/compositionApi',
        component: PostsPageWithCompositionAPI
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router