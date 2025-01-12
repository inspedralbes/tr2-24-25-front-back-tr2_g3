import { createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts'; 
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Main from '@/components/Main.vue';
import GestionMates from '@/components/GestionMates.vue';
import CrearSala from '@/components/CrearSala.vue';

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register }, 
  { path: '/main', name: 'Main', component: Main, meta: { requiresAuth: true } },
  { path: '/GestionMates', name: 'GestionMates', component: GestionMates, meta: { requiresAuth: true } },
  { path: '/CrearSala', name: 'CrearSala', component: CrearSala, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes), 
});


router.beforeEach((to, from, next) => {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' }); // Redirigir a la página de login
  } else {
    next(); // Continuar con la navegación
  }
});


router.isReady().then(() => {
  sessionStorage.removeItem('vuetify:dynamic-reload');
});

export default router;
