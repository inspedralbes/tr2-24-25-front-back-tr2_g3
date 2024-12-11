// router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts'; 
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Main from '@/components/Main.vue';


const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register }, 
  { path: '/main', name: 'Main', component: Main },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes), 
});

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload');
});

export default router;
