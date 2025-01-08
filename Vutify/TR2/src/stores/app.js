import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    user: {
      username: '',
      email: '',
      permission: '',
    },
    token: '',
  }),
  actions: {
    setUser(newUsername, newEmail, newPermission){
      this.user.username = newUsername,
      this.user.email = newEmail,
      this.user.permission = newPermission
    },

    setToken(newToken) {
      this.token = newToken;
    },

    getUserData() {
      return {
        name: this.user.name,
        email: this.user.email,
        token: this.token,
      };
    },

  },
});
