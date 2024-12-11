<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
    <v-card class="pa-5" max-width="400" elevation="8" outlined>
      <v-card-title class="text-center text-h5 primary--text">Iniciar Sesión</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <!-- Campo de correo -->
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
          ></v-text-field>

          <v-alert v-if="errorMessage" type="error" class="mt-4" dismissible>
            {{ errorMessage }}
          </v-alert>

          <!-- Botón de inicio de sesión -->
          <v-btn
            block
            color="primary"
            class="mt-4 rounded-lg"
            @click="login"
            :disabled="!valid"
          >
            Iniciar Sesión
          </v-btn>

          <!-- Botón para ir al registro -->
          <v-btn
            block
            class="mt-3"
            color="secondary"
            @click="goToRegister"
          >
            ¿No tienes cuenta? Regístrate
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
    const email = ref('');
    const password = ref('');
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
    };

    const login = () => {
      const result = appStore.login(email.value, password.value);  // Verificamos con los datos guardados en Pinia
      if (result) {
        errorMessage.value = '';
        router.push('/main');  // Redirigir a la página principal
      } else {
        errorMessage.value = 'Correo o contraseña incorrectos';
      }
    };

    const goToRegister = () => {
      router.push('/register');  // Redirigir al formulario de registro
    };

    return {
      email,
      password,
      errorMessage,
      valid,
      rules,
      login,
      goToRegister,
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
