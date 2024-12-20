<template>
  <v-container class="d-flex justify-center align-center fill-height background-image">
    <v-card class="pa-8" max-width="700" width="100%">
      <v-card-title class="justify-center">
        <h2>Restablecer Contraseña</h2>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="resetPassword">
          <!-- Nueva Contraseña -->
          <v-text-field
            v-model="newPassword"
            label="Nueva Contraseña"
            :type="showPassword ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock"
            outlined
            dense
            required
          >
            <template v-slot:append>
              <v-icon @click="togglePasswordVisibility('new')">
                {{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}
              </v-icon>
            </template>
          </v-text-field>

          <!-- Confirmar Contraseña -->
          <v-text-field
            v-model="confirmPassword"
            label="Confirmar Contraseña"
            :type="showPassword ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock"
            outlined
            dense
            required
          >
            <template v-slot:append>
              <v-icon @click="togglePasswordVisibility('confirm')">
                {{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}
              </v-icon>
            </template>
          </v-text-field>

          <!-- Botón para restablecer contraseña -->
          <v-btn color="primary" block class="mt-4" :disabled="loading" type="submit">
            Restablecer Contraseña
          </v-btn>

          <!-- Mensajes de Error y Exito -->
          <v-alert v-if="errorMessage" type="error" class="mt-4">{{ errorMessage }}</v-alert>
          <v-alert v-if="successMessage" type="success" class="mt-4">{{ successMessage }}</v-alert>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
const apiUrl = process.env.VUE_APP_API_URL;


export default {
  data() {
    return {
      newPassword: '',
      confirmPassword: '',
      loading: false,
      errorMessage: '',
      successMessage: '',
      showPassword: false // Estado para mostrar/ocultar contraseñas
    };
  },
  computed: {
    token() {
      return this.$route.query.token; // Obtener el token de la URL
    }
  },
  methods: {
    // Función para cambiar la visibilidad de las contraseñas
    togglePasswordVisibility(field) {
      if (field === 'new') {
        this.showPassword = !this.showPassword;
      } else if (field === 'confirm') {
        this.showPassword = !this.showPassword;
      }
    },
    
    async resetPassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden';
        return;
      }

      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';

      try {
        const response = await axios.post(`${apiUrl}/api/users/reset-password`, {
          token: this.token,
          newPassword: this.newPassword
        });

        this.successMessage = response.data.message;

        // Esperar 10 segundos antes de redirigir
        setTimeout(() => {
          this.$router.push({ name: 'Login' }); // Redirigir a la página de login
        }, 4000); // 4000 ms = 4 segundos (puedes ajustar este tiempo)

      } catch (error) {
        this.errorMessage = error.response.data.message || 'Error al restablecer la contraseña';
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

.v-card {
    max-width: 700px; /* La tarjeta puede ocupar hasta 700px */
    width: 100%;
}

.v-text-field,
.v-btn {
    font-size: 1.1rem; /* Aumentamos el tamaño del texto */
    padding: 12px 16px; /* Aumentamos el padding */
}

.v-alert {
    font-size: 1rem; /* Aumentamos el tamaño del texto de las alertas */
    margin-top: 16px;
}

</style>
