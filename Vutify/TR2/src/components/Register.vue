<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh; background-color: #f5f5f5;">
    <v-card class="pa-5" max-width="500" elevation="8" outlined>
      <v-card-title class="text-center text-h5 primary--text">Crear Cuenta</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="name" label="Nombre Completo" :rules="[rules.required]" required outlined dense clearable class="mb-4" hide-details="auto"></v-text-field>
          <v-text-field v-model="email" label="Correo Electrónico" :rules="[rules.required, rules.email]" required type="email" outlined dense clearable class="mb-4" hide-details="auto"></v-text-field>
          <v-text-field v-model="password" label="Contraseña" :rules="[rules.required, rules.minLength(6)]" required type="password" outlined dense clearable class="mb-4" hide-details="auto"></v-text-field>
          <v-text-field v-model="confirmPassword" label="Confirmar Contraseña" :rules="[rules.required, rules.matchPassword]" required type="password" outlined dense clearable class="mb-4" hide-details="auto"></v-text-field>

          <v-alert v-if="errorMessage" type="error" class="mt-4" dismissible>{{ errorMessage }}</v-alert>

          <v-btn block color="primary" class="mt-4 rounded-lg" @click="register" :disabled="!valid">Registrarse</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '../stores/app'; 
const store = useAppStore();

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const valid = ref(false);
const router = useRouter();

const rules = {
  required: (value) => !!value || 'Este campo es obligatorio',
  email: (value) => /.+@.+\..+/.test(value) || 'Introduce un correo electrónico válido',
  minLength: (length) => (value) => value.length >= length || `Debe tener al menos ${length} caracteres`,
  matchPassword: (value) => value === password.value || 'Las contraseñas no coinciden',
};

const register = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Las contraseñas no coinciden';
    return;
  }

  try {
    const success = await store.register(name.value, email.value, password.value); 
    if (success) {
      alert('Registro exitoso');
      router.push('/'); 
    } else {
      errorMessage.value = 'Error al registrar el usuario';
    }
  } catch (error) {
    console.error('Error de registro:', error.message);
    errorMessage.value = error.message;
  }
};
</script>
