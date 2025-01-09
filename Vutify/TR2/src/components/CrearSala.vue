<template>
    <div class="cosmic-background">
      <div class="overlay"></div>
      
      <!-- Botón de estadísticas fuera de la tarjeta -->
      <v-btn 
        color="primary" 
        fab
        class="stats-btn"
        @click="showStats"
      >
        <v-icon>mdi-chart-bar</v-icon>
      </v-btn>
  
      <v-container fluid class="d-flex align-center justify-center" style="height: 100vh;">
        <v-card 
          class="game-card glass-morphism" 
          elevation="15"
          max-width="500"
          data-aos="zoom-in"
        >
          <!-- Código de 6 caracteres -->
          <div class="code-container d-flex justify-center align-center">
            <h1 class="code-text" data-aos="fade-down">{{ roomCode }}</h1>
          </div>
  
          <!-- Nombre del portador de la bandera y imagen de la bandera -->
          <div class="flag-container d-flex justify-center align-center flex-column">
            <p class="flag-bearer-text">Portador de la bandera: {{ flagBearer }}</p>
            <v-img
              src="@/assets/images/imagen.png"
              max-height="50"
              contain
              class="mt-2"
            ></v-img>
          </div>
  
          <!-- Contadores de kills -->
          <v-card-text class="text-center py-4">
            <div class="d-flex justify-space-around">
              <div class="team-score">
                <h3 class="team-name">Equipo A</h3>
                <p class="score">{{ teamAKills }}</p>
              </div>
              <div class="team-score">
                <h3 class="team-name">Equipo B</h3>
                <p class="score">{{ teamBKills }}</p>
              </div>
            </div>
          </v-card-text>
  
          <!-- Botón de volver atrás -->
          <v-card-actions class="justify-center pb-4">
            <v-btn 
              color="secondary" 
              rounded="pill"
              class="action-btn"
              @click="goBack"
              data-aos="zoom-in-up"
            >
              <v-icon left>mdi-arrow-left</v-icon>
              Volver Atrás
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from "vue-router";
  import AOS from 'aos';
  import 'aos/dist/aos.css';
  import communicationManager from '../services/communicationManager';
  
  const router = useRouter();
  const roomCode = ref(); 
  const flagBearer = ref('Jugador1'); 
  const teamAKills = ref(5); 
  const teamBKills = ref(3); 
  
  const CreateCode = async () => {
  try {
    const response = await communicationManager.getCode();
    if (!response.ok) {
      errorMessage.value = 'Error al registrar el usuario';
    }

    const data = await response.json();
    roomCode.value = data.code;

  } catch (error) {
    console.error('Error de registro:', error.message);
    errorMessage.value = error.message;
  }
};

  
  const showStats = () => {
    // Lógica para mostrar estadísticas
    console.log('Mostrando estadísticas');
  };
  
  const goBack = () => {
    router.go(-1);
  };

  onMounted(async () => {
  AOS.init({
    duration: 1000,
    once: true
  });
  await CreateCode(); 
});
  </script>
  
  <style scoped>
  .cosmic-background {
    background: linear-gradient(135deg, #1a237e 0%, #4a148c 100%);
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
      radial-gradient(circle at top right, rgba(255,255,255,0.1), transparent 50%),
      radial-gradient(circle at bottom left, rgba(255,255,255,0.1), transparent 50%);
  }
  
  .glass-morphism {
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 20px !important;
    overflow: hidden;
  }
  
  .game-card {
    transition: all 0.5s ease;
  }
  
  .game-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.3);
  }
  
  .code-container {
    height: 150px;
    background: rgba(0,0,0,0.3);
  }
  
  .code-text {
    font-size: 5rem;
    font-weight: bold;
    color: #fff;
    text-shadow: 0 0 10px rgba(255,255,255,0.5);
    letter-spacing: 10px;
  }
  
  .flag-container {
    padding: 20px 0;
    background: rgba(0,0,0,0.2);
  }
  
  .flag-bearer-text {
    font-size: 1.2rem;
    color: #fff;
    margin-bottom: 10px;
  }
  
  .team-score {
    text-align: center;
  }
  
  .team-name {
    font-size: 1.5rem;
    color: #fff;
    margin-bottom: 5px;
  }
  
  .score {
    font-size: 3rem;
    font-weight: bold;
    color: #03e9f4;
    text-shadow: 0 0 10px rgba(3,233,244,0.5);
  }
  
  .action-btn {
    transition: all 0.3s ease;
    min-width: 200px;
  }
  
  .action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  }
  
  .stats-btn {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
  }
  </style>
  