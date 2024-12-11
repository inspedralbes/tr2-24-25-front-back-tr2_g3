import { defineStore } from 'pinia';
import { loginRequest, registerRequest } from '@/services/ServiceApi'; 

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
        const data = await loginRequest(email, password);
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
        const data = await registerRequest(name, email, password); 
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
