<template>
  <v-container 
    fluid 
    class="d-flex justify-center align-center login-container"
  >
    <v-card 
      class="pa-6 login-card" 
      max-width="480px" 
      elevation="12"
    >
      <v-card-title class="text-center text-h4 primary--text font-weight-bold">
        Bienvenido de Nuevo
      </v-card-title>
      <v-card-subtitle class="text-center grey--text text-subtitle-1 mb-6">
        Inicia sesión para acceder a tu cuenta
      </v-card-subtitle>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field 
            v-model="email" 
            label="Correo Electrónico" 
            :rules="[rules.required, rules.email]" 
            required 
            type="email" 
            outlined 
            clearable
            color="primary"
            dense
            class="mb-4"
          ></v-text-field>
          <v-text-field 
            v-model="password" 
            label="Contraseña" 
            :rules="[rules.required]" 
            required 
            type="password" 
            outlined 
            clearable
            color="primary"
            dense
            class="mb-4"
          ></v-text-field>

          <v-alert 
            v-if="errorMessage" 
            type="error" 
            class="mt-3" 
            border="top"
          >
            {{ errorMessage }}
          </v-alert>

          <v-btn 
            block 
            color="primary" 
            class="mt-4 rounded-pill text-h6 py-3" 
            :disabled="!valid" 
            @click="login" 
            elevation="2"
          >
            Iniciar Sesión
          </v-btn>
          <v-btn 
            block 
            color="secondary" 
            class="mt-3 rounded-pill text-h6 py-3" 
            @click="goToRegister" 
            elevation="1"
          >
            ¿No tienes cuenta? Regístrate
          </v-btn>
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

onMounted(() => {
  const isAuthenticated = pinia.token === '';
  if (!isAuthenticated) {
    router.push('/main');
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

    pinia.setToken(data.token);
    pinia.setUser(data.userInfo.username, data.userInfo.email, data.permission);
    sessionStorage.setItem('isAuthenticated', 'true');
    router.push('/main');
  } catch (error) {
    errorMessage.value = error.message;
  }
};

const goToRegister = () => {
  router.push('/register');
};
</script>

<style scoped>
/* Fondo negro elegante */
.login-container {
  background: #121212; /* Fondo negro puro */
  min-height: 100vh;
  padding: 0;
  margin: 0;
}

/* Tarjeta estilizada en tonos oscuros */
.login-card {
  border-radius: 24px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5); /* Sombra más intensa */
  background: #1e1e1e; /* Gris oscuro */
}

/* Colores y tipografía mejorados */
.primary--text {
  color: #90caf9; /* Azul claro */
}

.grey--text {
  color: #b0bec5; /* Gris claro */
}

/* Botones más grandes y elegantes */
.v-btn {
  text-transform: none;
  font-size: 18px;
  font-weight: bold;
  padding: 12px 16px;
}

.v-btn[color="primary"] {
  background-color: #2196f3; /* Azul brillante */
  color: white;
}

.v-btn[color="secondary"] {
  background-color: #f44336; /* Rojo brillante */
  color: white;
}

/* Alertas refinadas */
.v-alert {
  font-size: 16px;
  border-color: #ff6f61;
  color: #ff6f61;
  background: #2c2c2c; /* Fondo oscuro */
}

/* Campos de texto accesibles y más grandes */
.v-text-field {
  font-size: 18px;
  color: white; /* Texto blanco */
}

.v-text-field input {
  color: white; /* Texto blanco */
  font-size: 18px;
}

.v-text-field label {
  font-size: 16px;
  color: #b0bec5; /* Gris claro */
}

.v-card-title,
.v-card-subtitle {
  font-family: 'Roboto', sans-serif;
}

.v-card-title {
  font-size: 24px;
}

.v-card-subtitle {
  font-size: 18px;
}
</style>
