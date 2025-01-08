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
        :headers="headers"
        :items="usuariosFiltrados"
        :search="busqueda"
        :loading="cargando"
        class="elevation-1"
      >
        <template v-slot:item.rol="{ item }">
          <v-select
            v-model="item.rol"
            :items="['Administrador', 'Profesor', 'Alumno']"
            @change="guardarRol(item)"
            dense
          ></v-select>
        </template>
      </v-data-table>


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
import communicationManager from '../services/communicationManager';
import { da } from 'vuetify/locale';

const pinia = useAppStore();

const filtroRol = ref('Todos');
const busqueda = ref('');
const cargando = ref(false);
const usuarios = ref([]);
const errorMessage = ref('');
const headers = ref([
  { text: 'Nombre', value: 'nombre' },
  { text: 'Email', value: 'email' },
  { text: 'Rol', value: 'rol' },
]);

const router = useRouter();

const usuariosFiltrados = computed(() => {
  let filtrados = usuarios.value;

  if (filtroRol.value !== 'Todos') {
    filtrados = filtrados.filter((usuario) => usuario.rol === filtroRol.value);
  }

  if (busqueda.value) {
    filtrados = filtrados.filter((usuario) =>
      usuario.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
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
    usuarios.value = data; 
  } catch (error) {
    console.error('Error al obtener los usuarios:', error.message);
    errorMessage.value = error.message;
  } finally {
    cargando.value = false;
  }
};

const volverAtras = () => {
  router.push('/main');
};

onMounted(() => {
  cargarUsuarios();
});
</script>

<style scoped>
</style>
