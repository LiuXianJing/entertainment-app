import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const Game = () => import('../views/Game/index.vue')
const Video = () => import('../views/Video/index.vue')
const Chat = () => import('../views/Chat/index.vue')
const Mine = () => import('../views/Mine/index.vue')

const routes: RouteRecordRaw[] = [
    {
        name: 'Game',
        path: '/game',
        component: Game,
    },
    {
        name: 'Video',
        path: '/video',
        component: Video
    },
    {
        name: 'Chat',
        path: '/chat',
        component: Chat,
    },
    {
        name: 'Mine',
        path: '/mine',
        component: Mine,
    },
    {
        path: '/',
        redirect: '/game'
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
