import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from "@/components/HelloWorld.vue";
import UserLogin from "@/components/UserLogin.vue.vue";

const routes = [
    {
        path: '/',
        component: HelloWorld
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