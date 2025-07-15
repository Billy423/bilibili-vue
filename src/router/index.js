import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from "@/components/UserLogin.vue.vue";
import MainPage from "@/components/MainPage.vue";

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/userLogin',
        component: UserLogin
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;