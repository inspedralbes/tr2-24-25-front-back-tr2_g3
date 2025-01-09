<template>
  <v-container class="pa-4">
    <v-card class="elevation-10">
      <v-card-title class="headline">Gestión de Roles de Usuarios</v-card-title>
      <v-card-subtitle class="subtitle-1">
        Administra los roles de usuarios (Admin, Profesor, Alumno).
      </v-card-subtitle>

      <v-row class="px-4 py-2">
        <v-col cols="12" sm="6" md="4">
          <v-select
            v-model="filtroRol"
            :items="['Todos', 'Administrador', 'Profesor', 'Alumno']"
            label="Filtrar por rol"
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="busqueda"
            label="Buscar por nombre"
            dense
            outlined
            append-icon="mdi-magnify"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-data-table
        v-if="isAdmin"
        :headers="headers"
        :items="usuariosFiltrados"
        :search="busqueda"
        :loading="cargando"
        class="elevation-1"
      >
        <template v-slot:item.permission="{ item }">
          <v-select
            v-model="item.permission"
            :items="rolesDisponibles.map((rol)=>rol.text)"
            item-text="text"
            item-value="value"
            @change="guardarRol(item)"
            dense
            :disabled="item.email === user.email" 
          ></v-select>
        </template>
      </v-data-table>

      <!-- Muestra un aviso si no es admin -->
      <v-alert v-else-if="!isAdmin" type="warning" class="mt-4">
        No tienes permisos para gestionar roles de usuarios.
      </v-alert>

      <!-- Muestra un mensaje de error si existe -->
      <v-alert v-if="errorMessage" type="error" class="mt-4">
        {{ errorMessage }}
      </v-alert>

      <v-divider class="my-4"></v-divider>

      <v-btn color="secondary" @click="volverAtras" block rounded>
        Volver al inicio
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/stores/app';
import { storeToRefs } from 'pinia';
import communicationManager from '@/services/communicationManager';

const pinia = useAppStore();
const { user } = storeToRefs(pinia);
const router = useRouter();

const filtroRol = ref('Todos');
const busqueda = ref('');
const cargando = ref(false);
const usuarios = ref([]);
const errorMessage = ref('');
const headers = ref([
  { text: 'Nombre', value: 'username' },
  { text: 'Email', value: 'email' },
  { text: 'Rol', value: 'permission' },
]);

const isAdmin = computed(() => pinia.isAdmin);

const rolesDisponibles = [
  { text: 'Administrador', value: 'admin' }, // Asegúrate que estos valores coincidan con los del backend
  { text: 'Profesor', value: 'professor' },
  { text: 'Alumno', value: 'student' },
];

const usuariosFiltrados = computed(() => {
  let filtrados = usuarios.value;

  if (filtroRol.value !== 'Todos') {
    const rolValue = rolesDisponibles.find(r => r.text === filtroRol.value)?.value;
    filtrados = filtrados.filter((usuario) => usuario.permission === rolValue);
  }

  if (busqueda.value) {
    filtrados = filtrados.filter((usuario) =>
      usuario.username.toLowerCase().includes(busqueda.value.toLowerCase())
    );
  }

  return filtrados;
});

const cargarUsuarios = async () => {
  cargando.value = true;
  try {
    const response = await communicationManager.getUser();
    if (!response.ok) {
      throw new Error('Error al cargar usuarios');
    }
    const data = await response.json();
    
    console.log('Datos de usuarios recibidos:', data);
    
    usuarios.value = data; // Asegúrate que la estructura sea correcta.
    
  } catch (error) {
    console.error('Error al obtener los usuarios:', error.message);
    errorMessage.value = error.message;
  } finally {
    cargando.value = false;
  }
};

const guardarRol = async (item) => {
  console.log('Cambio de rol para:', item.email, 'Nuevo rol:', item.permission);
  
  // Aquí iría la lógica para guardar el cambio de rol en el backend.
};

const volverAtras = () => {
  router.push('/main');
};

onMounted(() => {
  console.log('Componente montado. Usuario actual:', user.value);
  
  if (isAdmin.value) {
    cargarUsuarios();
  }
});
</script>

<style scoped>
</style>
