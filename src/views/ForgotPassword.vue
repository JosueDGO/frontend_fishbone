<template>
  <v-container class="d-flex justify-center align-center fill-height background-image">
    <v-card class="pa-8" max-width="700" width="100%">
      <v-card-title class="justify-center">
        <h2>Recuperación de Contraseña</h2>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="sendResetEmail">
          <!-- Campo de correo electrónico -->
          <v-text-field
            v-model="email"
            label="Correo Electrónico"
            type="email"
            prepend-inner-icon="mdi-email"
            outlined
            dense
            required
          ></v-text-field>

          <!-- Botón para enviar el correo de recuperación -->
          <v-btn color="primary" block class="mt-4" :disabled="loading" type="submit">
            Enviar Correo
          </v-btn>
          
          <!-- Mensajes de error y éxito -->
          <v-alert v-if="errorMessage" type="error" class="mt-4">{{ errorMessage }}</v-alert>
          <v-alert v-if="successMessage" type="success" class="mt-4">{{ successMessage }}</v-alert>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';
const apiUrl = process.env.VUE_APP_API_URL;


export default {
  data() {
    return {
      email: '',
      loading: false,
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    async sendResetEmail() {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';

      try {
        const response = await axios.post(`${apiUrl}/api/users/forgot-password`, {
          correo: this.email
        });

        this.successMessage = response.data.message;
      } catch (error) {
        this.errorMessage = error.response.data.message || 'Error al enviar el correo';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
/* Asegura que el body y html ocupen toda la pantalla */
html,
body {
    height: 100%;
    margin: 0;
    overflow: hidden;
}

/* Contenedor principal */
.fill-height {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Fondo de pantalla */
.background-image {
    background-image: url('../../images/fondo3.jpg'); /* Cambia a la imagen que desees */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
}

/* Estilos para la tarjeta */
.v-card {
    max-width: 700px; /* Limita el ancho máximo de la tarjeta */
    width: 100%;
}

/* Estilo para los campos de texto */
.v-text-field,
.v-btn {
    font-size: 1.1rem; /* Aumentamos el tamaño del texto */
    padding: 12px 16px; /* Aumentamos el padding para hacer los campos más grandes */
}

/* Estilos para los mensajes de alerta */
.v-alert {
    font-size: 1rem; /* Aumentamos el tamaño del texto de las alertas */
    margin-top: 16px;
}
</style>
