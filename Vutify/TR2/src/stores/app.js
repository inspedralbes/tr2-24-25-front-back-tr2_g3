// stores/appStore.js
import { defineStore } from 'pinia';
import { login, register } from '@/services/authService'; // Asegúrate de que estos métodos estén definidos

export const useAppStore = defineStore('app', {
  state: () => ({
    user: {
      name: '',
      email: '',
    },
    token: localStorage.getItem('token') || '', // Recuperar token desde localStorage si existe
    isAuthenticated: !!localStorage.getItem('token'), // Verificar si hay un token en localStorage
  }),
  actions: {
    async login(email, password) {
      try {
        const data = await login(email, password);
        this.token = data.token;
        this.user = { ...this.user, email };
        this.isAuthenticated = true;
        
        // Guardar el token en localStorage
        localStorage.setItem('token', data.token);
        
        return true;
      } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
        return false;
      }
    },

    async register(name, email, password) {
      try {
        const data = await register(name, email, password);
        console.log(data.message);
        return true;
      } catch (error) {
        console.error('Error al registrar usuario:', error.message);
        return false;
      }
    },

    logout() {
      this.user = { name: '', email: '' };
      this.token = '';
      this.isAuthenticated = false;
      
      // Eliminar el token de localStorage al cerrar sesión
      localStorage.removeItem('token');
    },
  },
});
