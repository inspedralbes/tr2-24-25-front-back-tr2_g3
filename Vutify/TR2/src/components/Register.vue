<template>
  <v-container fluid class="d-flex justify-center align-center" style="height: 100vh; margin: 0; padding: 0; background-color: #f5f5f5;">
    <v-card class="pa-5" width="100%" max-width="400" elevation="0">
      <v-card-title class="text-center text-h5 primary--text">Crear Cuenta</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field 
            v-model="username" 
            label="Nombre Completo" 
            :rules="[rules.required]" 
            required 
            outlined 
            dense 
            clearable 
            class="mb-4"
          ></v-text-field>
          <v-text-field 
            v-model="email" 
            label="Correo Electrónico" 
            :rules="[rules.required, rules.email]" 
            required 
            type="email" 
            outlined 
            dense 
            clearable 
            class="mb-4"
          ></v-text-field>
          <v-text-field 
            v-model="password" 
            label="Contraseña" 
            :rules="[rules.required, rules.minLength(6)]" 
            required 
            type="password" 
            outlined 
            dense 
            clearable 
            class="mb-4"
          ></v-text-field>
          <v-text-field 
            v-model="confirmPassword" 
            label="Confirmar Contraseña" 
            :rules="[rules.required, rules.matchPassword]" 
            required 
            type="password" 
            outlined 
            dense 
            clearable 
            class="mb-4"
          ></v-text-field>

          <v-alert v-if="errorMessage" type="error" class="mt-4" dismissible>{{ errorMessage }}</v-alert>

          <v-btn 
            block 
            color="primary" 
            class="mt-4 rounded-lg" 
            @click="register" 
            :disabled="!valid"
          >
            Registrarse
          </v-btn>
          <v-btn block class="mt-3" color="secondary" @click="goToLogin">
            ¿Ya tienes cuenta? Inicia sesión
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { useAppStore } from '@/stores/app';
import { ref } from 'vue';
import communicationManager from '@/services/communicationManager';
import { useRouter } from 'vue-router';

const store = useAppStore();
const router = useRouter();
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const valid = ref(false);

const rules = {
  required: (value) => !!value || 'Este campo es obligatorio',
  email: (value) => /.+@.+\..+/.test(value) || 'Introduce un correo electrónico válido',
  minLength: (length) => (value) => value.length >= length || `Debe tener al menos ${length} caracteres`,
  matchPassword: (value) => value === password.value || 'Las contraseñas no coinciden',
};

const register = async () => {
  try {
    const userData = store.getUserData(); 
    const response = await communicationManager.register(username.value, email.value, password.value);

    if (!response.ok) {
      errorMessage.value = 'Error al registrar el usuario';
    }
    alert('Registro exitoso');
    router.push('/');
  } catch (error) {
    console.error('Error de registro:', error.message);
    errorMessage.value = error.message;
  }
};

const goToLogin = () => {
  router.push('/');
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
