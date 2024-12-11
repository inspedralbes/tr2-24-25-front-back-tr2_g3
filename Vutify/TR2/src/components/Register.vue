<template>
    <v-container class="d-flex justify-center align-center" style="height: 100vh; background-color: #f5f5f5;">
      <v-card class="pa-5" max-width="500" elevation="8" outlined>
        <v-card-title class="text-center text-h5 primary--text">Crear Cuenta</v-card-title>
  
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <!-- Campo de nombre -->
            <v-text-field
              v-model="name"
              label="Nombre Completo"
              :rules="[rules.required]"
              required
              outlined
              dense
              clearable
              class="mb-4"
              hide-details="auto"
            ></v-text-field>
  
            <!-- Campo de correo -->
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
              hide-details="auto"
            ></v-text-field>
  
            <!-- Campo de contraseña -->
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
              hide-details="auto"
            ></v-text-field>
  
            <!-- Campo de confirmación de contraseña -->
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
              hide-details="auto"
            ></v-text-field>
  
            <!-- Mensaje de error -->
            <v-alert v-if="errorMessage" type="error" class="mt-4" dismissible>
              {{ errorMessage }}
            </v-alert>
  
            <!-- Botón de registro -->
            <v-btn
              block
              color="primary"
              class="mt-4 rounded-lg"
              @click="register"
              :disabled="!valid"
            >
              Registrarse
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useAppStore } from '@/stores/app';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const name = ref('');
      const email = ref('');
      const password = ref('');
      const confirmPassword = ref('');
      const errorMessage = ref('');
      const valid = ref(false);
      const appStore = useAppStore();  // Usamos la tienda Pinia
      const router = useRouter();
  
      const rules = {
        required: (value) => !!value || 'Este campo es obligatorio',
        email: (value) =>
          /.+@.+\..+/.test(value) || 'Introduce un correo electrónico válido',
        minLength: (length) => (value) =>
          value.length >= length || `Debe tener al menos ${length} caracteres`,
        matchPassword: (value) =>
          value === password.value || 'Las contraseñas no coinciden',
      };
  
      const register = () => {
        if (password.value !== confirmPassword.value) {
          errorMessage.value = 'Las contraseñas no coinciden';
          return;
        }
  
        const result = appStore.register(name.value, email.value, password.value);  // Guardamos en Pinia
        if (result) {
          errorMessage.value = '';
          alert('Registro exitoso');
          router.push('/');  // Redirigir a la página de login después de registrarse
        } else {
          errorMessage.value = 'El correo ya está en uso';
        }
      };
  
      return {
        name,
        email,
        password,
        confirmPassword,
        errorMessage,
        valid,
        rules,
        register,
      };
    },
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
  