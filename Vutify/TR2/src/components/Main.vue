<template>
  <div class="cosmic-background">
    <div class="overlay"></div>
    
    <!-- Botón de ajustes fuera del div principal -->
    <v-btn 
      color="secondary" 
      rounded
      class="gestion-mates-btn stylish-btn"
      @click="GestionMates"
    >
      <v-icon left>mdi-settings-outline</v-icon> <!-- Icono más llamativo -->
      Ir a Gestión
    </v-btn>

    <v-container fluid class="d-flex align-center justify-center" style="height: 100vh;">
      <v-card 
        class="game-card glass-morphism" 
        elevation="15"
        max-width="400"
        data-aos="zoom-in"
      >
        <!-- Imagen con efectos -->
        <v-img
          :src="imageSrc"
          alt="Juego Matemáticas"
          class="game-image"
          height="200"
        >
          <template #default>
            <div class="image-overlay">
              <!-- Botón de Descargar Imagen -->
              <v-btn 
                class="download-btn stylish-btn"
                @click="downloadImage"
              >
                <v-icon left>mdi-download</v-icon> <!-- Icono atractivo para descarga -->
                Descargar Imagen
              </v-btn>
            </div>
          </template>
        </v-img>

        <!-- Contenido de la tarjeta -->
        <v-card-text class="text-center py-4">
          <h2 
            class="text-h4 mb-2 neon-text" 
            data-aos="fade-up"
          >
            Matemáticas Challenge
          </h2>
          <p 
            class="text-subtitle-2 text-medium-emphasis" 
            data-aos="fade-up" 
            data-aos-delay="200"
          >
            Desafía tu inteligencia matemática
          </p>
        </v-card-text>

        <!-- Botón de acción para Crear Sala -->
        <v-card-actions class="justify-center pb-4">
          <v-btn 
            color="primary" 
            rounded
            class="action-btn stylish-btn"
            @click="CrearSala"
            data-aos="zoom-in-up"
          >
            <v-icon left>mdi-play-circle-outline</v-icon> <!-- Icono llamativo para crear sala -->
            Crear Sala
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from "vue-router";
import imageSrc from "@/assets/images/imagen.png";
import { useAppStore } from '@/stores/app';
import AOS from 'aos';
import 'aos/dist/aos.css';

const router = useRouter();

const GestionMates = () => {
  router.push("/GestionMates");
};

const CrearSala = () => {
  router.push("/CrearSala");
};

const downloadImage = () => {
  const link = document.createElement('a');
  link.href = imageSrc;
  link.download = 'MathGame.png';
  link.click();
};

onMounted(() => {
  const pinia = useAppStore();
  if (pinia.token === '') {
    router.push("/");
  }
  AOS.init({
    duration: 1000,
    once: true
  });
});
</script>



<style scoped>
.cosmic-background {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at top right, rgba(255,255,255,0.3), transparent 50%),
              radial-gradient(circle at bottom left, rgba(255,255,255,0.2), transparent 50%);
}

.glass-morphism {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 30px !important;
}

.game-card {
  transition: all 0.5s ease;
}

.game-card:hover {
  transform: translateY(-5px);
}

.neon-text {
  color: #fff;
}

.stylish-btn {
  background: linear-gradient(90deg, #ff6a00, #ee0979); /* Gradiente vibrante */
  color: white; /* Color del texto */
  border-radius: 25px; /* Bordes redondeados */
  padding: 12px; /* Espaciado interno */
  font-weight: bold; /* Negrita */
  box-shadow:
     -1px -1px rgba(255,255,255,.5),
     -2px -2px rgba(0,0,0,.5); /* Sombra brillante */
  transition: background-color .3s ease, transform .2s; /* Transiciones suaves */
}

.stylish-btn:hover {
   background-color: #ff4c00; /* Color más oscuro al pasar el ratón */
   transform: scale(1.05) rotate(3deg); /* Efecto de aumento y rotación al pasar el ratón */
   box-shadow:
     -1px -1px rgba(255,255,255,.7),
     -2px -2px rgba(0,0,0,.7); /* Sombra más intensa al pasar el ratón */
}

.download-btn {
   background-color: #4caf50; /* Color verde para el botón de descarga */
   color: white; /* Color del texto */
   border-radius: 25px; /* Bordes redondeados */
   padding: 12px; /* Espaciado interno */
   font-weight: bold; /* Negrita */
   transition: background-color .3s ease, transform .2s; /* Transiciones suaves */
   box-shadow:
     -1px -1px rgba(255,255,255,.5),
     -2px -2px rgba(0,0,0,.5); /* Sombra brillante */
}

.download-btn:hover {
   background-color: #45a049; /* Color más oscuro al pasar el ratón */
   transform: scale(1.05) rotate(-3deg); /* Efecto de aumento y rotación al pasar el ratón */
   box-shadow:
     -1px -1px rgba(255,255,255,.7),
     -2px -2px rgba(0,0,0,.7); /* Sombra más intensa al pasar el ratón */
}

.gestion-mates-btn {
   background-color: #2196f3; /* Color azul para el botón de gestión */
   color: white; /* Color del texto */
   border-radius: 25px; /* Bordes redondeados */
   padding: 12px; /* Espaciado interno */
   font-weight: bold; /* Negrita */
   transition: background-color .3s ease, transform .2s; /* Transiciones suaves */
   box-shadow:
     -1px -1px rgba(255,255,255,.5),
     -2px -2px rgba(0,0,0,.5); /* Sombra brillante */
}

.gestion-mates-btn:hover {
   background-color: #1976d2; /* Color más oscuro al pasar el ratón */
   transform: scale(1.05) rotate(-3deg); /* Efecto de aumento y rotación al pasar el ratón */
   box-shadow:
     -1px -1px rgba(255,255,255,.7),
     -2px -2px rgba(0,0,0,.7); /* Sombra más intensa al pasar el ratón */
}

.floating-btn {
   position: fixed;
   top: 20px;
   left: 20px;
   z-index: 1000;
   background-color: rgba(255, 255, 255, .2);
   backdrop-filter: blur(5px);
   transition: all .3s ease;
}

.floating-btn:hover {
   background-color: rgba(255,255,255,.3);
   transform: rotate(90deg);
}

.image-overlay {
   position: absolute;
   top: 0;
   right: 0;
   bottom: 0;
   left: 0;
   display: flex;
   justify-content: flex-end;
}
</style>
