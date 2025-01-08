<template>
  <div class="cosmic-background">
    <div class="overlay"></div>
    
    <!-- Botón de ajustes fuera del div principal -->
    <v-btn 
      icon 
      color="white" 
      class="settings-btn floating-btn"
      @click="GestionMates"
    >
      <v-icon>mdi-cog</v-icon>
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
              <v-btn 
                icon 
                color="white" 
                class="download-btn pulse-animation"
                @click="downloadImage"
              >
                <v-icon>mdi-download</v-icon>
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

        <!-- Botón de acción -->
        <v-card-actions class="justify-center pb-4">
          <v-btn 
            color="primary" 
            rounded="pill"
            class="action-btn glitch-effect"
            @click="CrearSala"
            data-aos="zoom-in-up"
          >
            <v-icon left>mdi-plus-circle</v-icon>
            Crear Sala
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import imageSrc from "@/assets/images/imagen.png";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  name: "MathGameLanding",
  setup() {
    const router = useRouter();

    // Inicializar AOS para animaciones
    AOS.init({
      duration: 1000,
      once: true
    });

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

    return {
      GestionMates,
      CrearSala,
      downloadImage,
      imageSrc
    };
  }
}
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
  background: 
    radial-gradient(circle at top right, rgba(255,255,255,0.3), transparent 50%),
    radial-gradient(circle at bottom left, rgba(255,255,255,0.2), transparent 50%);
}

.glass-morphism {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 30px !important;
  overflow: hidden;
}

.game-card {
  transition: all 0.5s ease;
}

.game-card:hover {
  transform: translateY(-5px);
}

.neon-text {
  color: #fff;
  text-shadow: 
    0 0 5px #03e9f4,
    0 0 25px #03e9f4,
    0 0 50px #03e9f4,
    0 0 100px #03e9f4;
}

.action-btn {
  position: relative;
  overflow: hidden;
}

.glitch-effect::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent 50%, rgba(255,255,255,0.1));
  transform: translate(-50%, -50%);
  opacity: 0.5;
}

.pulse-animation {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.floating-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.floating-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
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
  align-items: flex-start;
  padding: 10px;
}

.download-btn {
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
}

.download-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
