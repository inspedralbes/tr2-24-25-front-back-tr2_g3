<template>
    <v-container class="pa-4">
      <v-card class="elevation-10">
        <v-card-title class="headline">Gestión de Roles de Usuarios</v-card-title>
        <v-card-subtitle class="subtitle-1">
          Administra los roles de usuarios (Admin, Profesor, Alumno).
        </v-card-subtitle>
  
        <!-- Filtro y buscador -->
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
  
  <script>
  export default {
    name: "GestionMates",
    data() {
      return {
        filtroRol: 'Todos',
        busqueda: '',
        headers: [
          { text: "Nombre", align: "start", value: "name" },
          { text: "Correo Electrónico", align: "start", value: "email" },
          { text: "Rol", value: "rol" }
        ],
        usuarios: [
          { id: 1, name: "Juan Pérez", email: "juan.perez@dominio.com", rol: "Alumno" },
          { id: 2, name: "María Gómez", email: "maria.gomez@dominio.com", rol: "Profesor" },
          { id: 3, name: "Carlos Ruiz", email: "carlos.ruiz@dominio.com", rol: "Administrador" },
          { id: 4, name: "Ana López", email: "ana.lopez@dominio.com", rol: "Alumno" },
          { id: 5, name: "Luis García", email: "luis.garcia@dominio.com", rol: "Profesor" }
        ]
      };
    },
    computed: {
      usuariosFiltrados() {
        if (this.filtroRol === 'Todos') {
          return this.usuarios;
        }
        return this.usuarios.filter(usuario => usuario.rol === this.filtroRol);
      }
    },
    methods: {
      guardarRol(usuario) {
        console.log(`Rol de ${usuario.name} actualizado a ${usuario.rol}`);
        // Aquí puedes agregar la lógica para guardar en el backend
      },
      volverAtras() {
        this.$router.push("/main");
      }
    }
  };
  </script>
  
  <style scoped>
  .v-container {
    max-width: 1000px;
    margin-top: 40px;
  }
  
  .v-card {
    border-radius: 16px;
  }
  
  .v-btn {
    transition: transform 0.3s;
  }
  
  .v-btn:hover {
    transform: scale(1.05);
  }
  
  .v-data-table th {
    background-color: #f5f5f5;
    font-weight: bold;
  }
  
  .v-card-subtitle {
    color: #666;
  }
  
  .v-divider {
    margin-top: 20px;
  }
  </style>
  