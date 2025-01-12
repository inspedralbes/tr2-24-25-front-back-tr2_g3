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
          <v-text-field 
            v-model="email" 
            label="Correo electrónico" 
            :rules="[rules.required, rules.email]" 
            required 
            type="email" 
            outlined 
            dense 
            clearable
          ></v-text-field>
          <v-text-field 
            v-model="password" 
            label="Contraseña" 
            :rules="[rules.required]" 
            required 
            type="password" 
            outlined 
            dense 
            clearable
          ></v-text-field>

          <v-alert v-if="errorMessage" type="error" class="mt-4" dismissible>{{ errorMessage }}</v-alert>

          <v-btn block color="primary" class="mt-4 rounded-lg" @click="login" :disabled="!valid">Iniciar Sesión</v-btn>
          <v-btn block class="mt-3" color="secondary" @click="goToRegister">¿No tienes cuenta? Regístrate</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/stores/app';
import communicationManager from '@/services/communicationManager';

const pinia = useAppStore();

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const valid = ref(false);
const router = useRouter();

const rules = {
  required: (value) => !!value || 'Este campo es obligatorio',
  email: (value) => /.+@.+\..+/.test(value) || 'Introduce un correo electrónico válido',
};

// Verificar si ya está autenticado y redirigir si es el caso
onMounted(() => {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
  if (isAuthenticated) {
    router.push('/main'); // Redirigir a la página principal si ya está autenticado
  }
});

const login = async () => {
  try {
    const response = await communicationManager.login(email.value, password.value);

    if (!response.ok) {
      errorMessage.value = 'Credenciales incorrectas';
      return;
    }

    const data = await response.json();
    
    console.log('Datos del usuario recibidos:', data); // Para depuración

    // Ajusta aquí para acceder al campo correcto
    pinia.setToken(data.token);
    pinia.setUser(
      data.userInfo.username, 
      data.userInfo.email, 
      data.permission // Cambiado a data.permission
    );
    
    console.log('Usuario guardado en Pinia:', pinia.user); // Para depuración

    // Guardar estado de autenticación en sessionStorage
    sessionStorage.setItem('isAuthenticated', 'true');

    router.push('/main'); // Redirigir a la página principal

  } catch (error) {
    console.error('Error de login:', error.message);
    errorMessage.value = error.message;
  }
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
