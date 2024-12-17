import { createRouter, createWebHistory } from "vue-router";
import ContentComponent from "@/components/ContentComponent.vue";
import NewComponent from "@/components/NewComponent.vue";
const routes = [
    {
        path: "/",
        component: ContentComponent,
    },
    {
        path: "/new",
        component: NewComponent,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;