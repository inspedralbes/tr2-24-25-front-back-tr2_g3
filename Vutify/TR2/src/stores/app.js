import { defineStore } from 'pinia';
import { login, register } from '@/services/authService'; 

export const useAppStore = defineStore('app', {
  state: () => ({
    user: {
      name: '',
      email: '',
    },
    token: '',
    isAuthenticated: false,
  }),
  actions: {
    async login(email, password) {
      try {
        const data = await login(email, password);
        this.token = data.token;
        this.user = { ...this.user, email };
        this.isAuthenticated = true;
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
    },
  },
});
