<template>
  <div class="space-background">
    <div class="stars"></div>
    <div class="twinkling"></div>
    <div class="clouds"></div>

    <v-btn 
      color="primary" 
      fab
      class="stats-btn animated-btn pulsing"
      @click="showStats"
    >
      <v-icon>mdi-chart-bar</v-icon>
    </v-btn>

    <v-container fluid class="d-flex align-center justify-center" style="height: 100vh; width: 100%;">
      <v-card 
        class="game-card space-glass" 
        elevation="20"
        max-width="1600px" 
        data-aos="zoom-in"
      >
        <div class="code-container d-flex justify-center align-center">
          <h1 class="code-text glow-text" data-aos="fade-down">{{ roomCode }}</h1>
        </div>

        <v-card-text class="text-center py-4">
          <div class="d-flex justify-space-around team-scores">
            <div class="team-score">
              <div class="character-container">
                <p class="score glow-text pulsing">{{ flagBearerB }}</p>
                <v-img
                  src="@/assets/images/BanderaVerde.png"
                  height="200" 
                  width="200" 
              
                  class="team-icon character-animation"
                ></v-img>
              </div>
            </div>
            <div class="team-score">
              <div class="character-container">
                <p class="score glow-text pulsing">{{flagBearerA  }}</p>
                <v-img
                  src="@/assets/images/banderaRoja.png"
                  height="200" 
                  width="200" 
              
                  class="team-icon character-animation"
                ></v-img>
              </div>
            </div>
          </div>
        </v-card-text>

        <v-card-text class="text-center py-4">
          <div class="d-flex justify-space-around team-scores">
            <div class="team-score">
              <div class="character-container">
                <v-img
                  src="@/assets/images/PersonajeVerde.png"
                  height="200" 
                  width="200" 
                 
                  class="team-icon character-animation"
                ></v-img>
              </div>
              <h3 class="team-name glow-text">Equipo A</h3>
              <p class="score glow-text pulsing">{{ teamAKills }}</p>
            </div>
            <div class="team-score">
              <div class="character-container">
                <v-img
                  src="@/assets/images/PersonajeRojoActualiazdooo.png"
                  height="200" 
                  width="200" 
                
                  class="team-icon character-animation"
                ></v-img>
              </div>
              <h3 class="team-name glow-text">Equipo B</h3>
              <p class="score glow-text pulsing">{{ teamBKills }}</p>
            </div>
          </div>
        </v-card-text>

        <v-card-actions class="justify-center pb-4">
          <v-btn 
            color="secondary" 
            rounded="pill"
            class="action-btn animated-btn"
            @click="goBack"
            data-aos="zoom-in-up"
          >
            <v-icon left>mdi-rocket</v-icon>
            Volver a la Base
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from "vue-router";
import { io } from 'socket.io-client';
import AOS from 'aos';
import 'aos/dist/aos.css';
import communicationManager from '../services/communicationManager';

// Variables reactivas
const router = useRouter();
const roomCode = ref();
const flagBearerA = ref('Base');  // Nombre por defecto para la bandera A
const flagBearerB = ref('Base');  // Nombre por defecto para la bandera B
const teamAKills = ref(0); 
const teamBKills = ref(0);

// Conectar al servidor WebSocket
const socket = io('http://localhost:3000'); 

// Crear el código de la sala
const CreateCode = async () => {
  try {
    const response = await communicationManager.getCode();
    if (!response.ok) {
      throw new Error('Error al generar el código de sala');
    }
    const data = await response.json();
    roomCode.value = data.code;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Mostrar estadísticas (placeholder para lógica futura)
const showStats = () => {
  console.log('Mostrando estadísticas');
};

// Regresar a la página anterior
const goBack = () => {
  router.go(-1);
};

onMounted(async () => {
  AOS.init({
    duration: 1000,
    once: true
  });

  await CreateCode();

  // Escuchar evento de estadísticas de equipo
  socket.on('team-kills-rojo', (data) => {
    console.log('Datos recibidos:', data);
    teamAKills.value = data.teamA || 0; 
  });
  socket.on('team-kills-verde', (data) => {
    console.log('Datos recibidos:', data);
    teamBKills.value = data.teamB || 0; 
  });

  // Escuchar evento para asignar nombres a los portadores de las banderas
  socket.on('flag-bearer-a', (data) => {
    flagBearerA.value = data.name || 'Base'; // Actualizar el nombre del portador
  });

  socket.on('flag-bearer-b', (data) => {
    flagBearerB.value = data.name || 'Base'; // Actualizar el nombre del portador
  });
});

onUnmounted(() => {
  socket.disconnect();
});
</script>

<style scoped>
/* Fondo y superposiciones */
.space-background {
  background: linear-gradient(135deg, #00bcd4, #8e24aa);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  animation: backgroundAnimation 15s ease-in-out infinite;
}

@keyframes backgroundAnimation {
  0% {
    background: linear-gradient(135deg, #00bcd4, #8e24aa);
  }
  50% {
    background: linear-gradient(135deg, #3f51b5, #e91e63);
  }
  100% {
    background: linear-gradient(135deg, #00bcd4, #8e24aa);
  }
}

/* Ajustes del contenedor */
.v-container {
  width: 100%;
  padding: 0;
  margin: 0;
}

/* Tarjeta */
.game-card {
  transition: all 0.5s ease;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  max-width: 90vw; 
  width: 30vw;
  height: 95vh;
}
.game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.5);
}

/* Códigos de sala */
.code-container {
  height: 150px;
  background: rgba(0,0,0,0.3);
}

.code-text {
  font-size: 6rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.7);
  letter-spacing: 20px; /* Aumenta el espaciado entre caracteres */
  margin-bottom: 50px; /* Aumenta el espacio debajo del código */
}

/* Ajustes de las banderas */
.flag-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px; /* Espacio entre las banderas */
}

.flag-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px; /* Espacio entre texto y bandera */
}

.flag-image {
  max-height: 1000px; /* Aumenta el tamaño de la bandera */
}

.flag-bearer-text {
  font-size: 1.5rem;
  letter-spacing: 5px;
  margin-bottom: 15px; /* Aumenta el espacio debajo del texto */
}

/* Animaciones */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.character-container {
  perspective: 1000px;
  transform-style: preserve-3d;
}

.character-animation {
  animation: character-idle 4s ease-in-out infinite;
  transition: all 0.3s ease;
}

.character-animation:hover {
  animation: character-hover 1s ease-in-out infinite;
}

/* Brillo de texto */
.glow-text {
  text-shadow: 0 0 15px rgba(255,255,255,0.9), 0 0 25px rgba(0,255,255,0.7), 0 0 40px rgba(0,255,255,0.5);
}

/* Botones */
.stats-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.stats-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.action-btn {
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.action-btn:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 10px 20px rgba(0,0,0,0.4);
}

/* Puntuaciones */
.score {
  font-size: 4rem;
  font-weight: 600;
  color: #03e9f4;
  text-shadow: 0 0 15px rgba(3,233,244,0.7);
}

/* Efectos flotantes */
.floating {
  animation: float 6s ease-in-out infinite;
}

.pulsing {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes character-idle {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-5px) rotate(-2deg);
  }
  50% {
    transform: translateY(0) rotate(0deg);
  }
  75% {
    transform: translateY(-5px) rotate(2deg);
  }
}

@keyframes character-hover {
  0%, 100% {
    transform: translateY(0) scale(1) rotate(0deg);
    filter: brightness(1);
  }
  50% {
    transform: translateY(-10px) scale(1.05) rotate(5deg);
    filter: brightness(1.2);
  }
}

.character-container {
  min-height: 20px;
  perspective: 1000px;
  transform-style: preserve-3d;
}

.character-animation {
  animation: character-idle 4s ease-in-out infinite;
  transition: all 0.3s ease;
}

.character-animation:hover {
  animation: character-hover 1s ease-in-out infinite;
}

.team-icon {
  max-height: none; /* Permitir que las imágenes crezcan sin restricciones */
  height: auto; /* Ajustar la altura automáticamente */
}


/* Mejora en la transición de los botones */
.action-btn {
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.action-btn:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 10px 20px rgba(0,0,0,0.4);
}

/* Mejora en el efecto de brillo del texto */
.glow-text {
  text-shadow: 0 0 10px rgba(255,255,255,0.7), 0 0 20px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3);
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}
</style>
