<template>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title class="text-center text-h5">Bienvenido a la Página Principal</v-card-title>
            <v-card-text>
              <p>Has iniciado sesión correctamente. ¡Bienvenido!</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "Main",
    setup() {
      return {};
    },
  };
  </script>
  
  <style scoped>
  .v-container {
    margin-top: 20px;
  }
  </style>
  