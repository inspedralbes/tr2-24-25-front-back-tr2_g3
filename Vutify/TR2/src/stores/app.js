// src/stores/app.js
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    user: {
      name: '',
      email: '',
      password: '',
    },
    isAuthenticated: false
  }),
  actions: {
    login(email, password) {
      if (this.user.email === email && this.user.password === password) {
        this.isAuthenticated = true;
        return true;
      }
     else {
        return false;
      }
    },

    register(name, email, password) {
      if (this.user.email === email) {
        return false;
      }
      this.user = { name, email, password };
      this.isAuthenticated = true; 
      return true;
    },

    logout() {
      this.user = { name: '', email: '', password: '' };
      this.isAuthenticated = false;
    },
  },
});
