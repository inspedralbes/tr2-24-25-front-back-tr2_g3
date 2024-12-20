<template>
  <v-container fluid class="d-flex justify-center align-center" style="height: 100vh; margin: 0; padding: 0;">
    <v-card 
      class="pa-5" 
      width="100%" 
      max-width="400" 
      elevation="8" 
      outlined
    >
      <v-card-title class="text-center text-h5 primary--text">Iniciar Sesión</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="email" label="Correo electrónico" :rules="[rules.required, rules.email]" required type="email" outlined dense clearable></v-text-field>
          <v-text-field v-model="password" label="Contraseña" :rules="[rules.required]" required type="password" outlined dense clearable></v-text-field>

          <v-alert v-if="errorMessage" type="error" class="mt-4" dismissible>{{ errorMessage }}</v-alert>

          <v-btn block color="primary" class="mt-4 rounded-lg" @click="login" :disabled="!valid">Iniciar Sesión</v-btn>
          <v-btn block class="mt-3" color="secondary" @click="goToRegister">¿No tienes cuenta? Regístrate</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/stores/app';
import { communicationManager } from '@/services/communicationManager';
const store = useAppStore();

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const valid = ref(false);
const router = useRouter();

const rules = {
  required: (value) => !!value || 'Este campo es obligatorio',
  email: (value) => /.+@.+\..+/.test(value) || 'Introduce un correo electrónico válido',
};

const login = async () => {
  try {
    const response = await communicationManager.login(email, password);

    if(!response.ok){
      errorMessage.value = 'Credenciales incorrectas';
      return
    }

    const data = response.json()
    
    useAppStore.setToken(data.token);
    useAppStore.setUser(data.userInfo.username, data.userInfo.email);
    
    router.push('/main');

  } catch (error) {
    console.error('Error de login:', error.message);
    errorMessage.value = error.message;
  }
  // try {
  //   const success = await store.login(email.value, password.value); 
  //   if (success) {
  //     router.push('/main'); 
  //   } else {
  //     errorMessage.value = 'Credenciales incorrectas';
  //   }
  // } catch (error) {
  //   console.error('Error de login:', error.message);
  //   errorMessage.value = error.message;
  // }
};

const goToRegister = () => {
  router.push('/register');
};
</script>

<style scoped>
.v-container {
  background-color: #f5f5f5;
}

.v-card {
  border-radius: 16px;
}

.primary--text {
  color: #1976d2;
}

.v-btn {
  font-weight: 500;
}

.v-alert {
  font-weight: 400;
  font-size: 14px;
}

.v-text-field input {
  font-size: 16px;
}
</style>
