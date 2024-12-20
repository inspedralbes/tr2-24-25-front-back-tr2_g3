// stores/appStore.js
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    user: {
      name: '',
      email: '',
    },
    token: '',
  }),
  actions: {
    setUser(newName, newEmail){
      this.user.name = newName,
      this.user.email = newEmail
    },

    setToken(newToken){
      this.token = newToken
    },
  },
});
