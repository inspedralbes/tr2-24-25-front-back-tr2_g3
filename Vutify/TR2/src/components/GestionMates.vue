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
        :items="usuariosFiltrados"  <!-- Aquí usamos la propiedad computada -->
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

      <v-snackbar v-model="snackbar" :color="snackbarColor" top>
        {{ snackbarText }}
      </v-snackbar>

      <v-divider class="my-4"></v-divider>

      <v-btn color="secondary" @click="volverAtras" block rounded>
        Volver al inicio
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: "GestionMates",
  data() {
    return {
      filtroRol: 'Todos',
      busqueda: '',
      headers: [
        { text: "Nombre", align: "start", value: "username" },
        { text: "Correo Electrónico", align: "start", value: "email" },
        { text: "Rol", value: "rol" }
      ],
      usuarios: [],
      cargando: false,
      snackbar: false,
      snackbarText: '',
      snackbarColor: 'info'
    };
  },
  computed: {
    // Propiedad computada para filtrar los usuarios según el rol
    usuariosFiltrados() {
      console.log('Usuarios filtrados:', this.usuarios);  // Verifica qué usuarios están siendo filtrados
      if (this.filtroRol === 'Todos') {
        return this.usuarios;
      }
      return this.usuarios.filter(usuario => usuario.rol === this.filtroRol);
    }
  },
  methods: {
    async obtenerUsuarios() {
  this.cargando = true;
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró token de autenticación');
    }

    const response = await axios.get('http://localhost:3000/user', {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log('Datos de usuarios:', response.data); // Agrega este log

    if (Array.isArray(response.data)) {
      this.usuarios = response.data.map(usuario => ({
        ...usuario,
        rol: this.getRolByPermissionId(usuario.permission_type_id)
      }));
      this.mostrarMensaje('Usuarios cargados exitosamente', 'success');
    } else {
      throw new Error('La respuesta del servidor no es un array');
    }
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    this.mostrarMensaje('Error al cargar los usuarios', 'error');
  } finally {
    this.cargando = false;
  }
},
    getRolByPermissionId(permissionId) {
      const roles = {
        1: 'Administrador',
        2: 'Profesor',
        3: 'Alumno'
      };
      return roles[permissionId] || 'Desconocido';
    },
    async guardarRol(usuario) {
      try {
        const permissionId = this.getPermissionIdByRol(usuario.rol);
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:3000/user/${usuario.id}/permission`, {
          permission_type_id: permissionId
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.mostrarMensaje(`Rol de ${usuario.username} actualizado a ${usuario.rol}`, 'success');
      } catch (error) {
        console.error('Error al guardar el rol:', error);
        this.mostrarMensaje('Error al guardar el rol', 'error');
      }
    },
    getPermissionIdByRol(rol) {
      const permisos = {
        'Administrador': 1,
        'Profesor': 2,
        'Alumno': 3
      };
      return permisos[rol] || 3;
    },
    volverAtras() {
      this.$router.push("/main");
    },
    mostrarMensaje(texto, color) {
      this.snackbarText = texto;
      this.snackbarColor = color;
      this.snackbar = true;
    }
  },
  mounted() {
    this.obtenerUsuarios();
  }
};
</script>
