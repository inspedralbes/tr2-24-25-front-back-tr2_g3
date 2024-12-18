<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4">
        <!-- Tarjeta del juego -->
        <v-card class="elevation-10" max-width="400">
          <!-- Imagen del juego con opción de descarga -->
          <v-img
            :src="imageSrc"
            alt="Imagen del Juego"
            height="200px"
            class="rounded-t-lg"
          >
            <!-- Botón de descarga -->
            <template #append>
              <v-btn
                icon
                color="primary"
                :href="imageSrc"
                download="JuegoMatematicas.png"
                class="download-btn"
                title="Descargar imagen"
              >
                <v-icon>mdi-download</v-icon>
              </v-btn>
            </template>
          </v-img>

          <v-card-text class="text-center">
            <h2 class="headline font-weight-bold">Juego Matemáticas</h2>
            <p class="body-1">¡Desafía tu mente con nuestro juego de matemáticas!</p>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn
              color="primary"
              @click="GestionMates"
              rounded
              size="large"
              elevation="2"
            >
              Gestionar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useRouter } from "vue-router";
import imageSrc from "@/assets/images/imagen.png";

export default {
  name: "Main",
  setup() {
    const router = useRouter();

    const GestionMates = () => {
      router.push("/GestionMates");
    };

    return {
      GestionMates,
      imageSrc,
    };
  },
};
</script>

<style scoped>
.v-container {
  margin-top: 40px;
}

.v-card {
  border-radius: 16px;
}

.v-img {
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  position: relative;
}

.download-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
}

.download-btn:hover {
  background-color: rgba(255, 255, 255, 1);
}

.v-btn {
  transition: transform 0.3s;
}

.v-btn:hover {
  transform: scale(1.05);
}

.v-card-text h2 {
  font-size: 1.5rem;
  font-weight: bold;
}

.v-card-text p {
  color: #666;
  font-size: 1rem;
  margin-top: 5px;
}
</style>
