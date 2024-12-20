<template>
    <v-container class="d-flex justify-center align-center fill-height background-image">
      <v-card class="pa-8" max-width="400" width="100%">
        <v-card-title class="justify-center">
          <h2>Inicio</h2>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              prepend-inner-icon="mdi-email"
              outlined
              dense
              required
            ></v-text-field>
  
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              prepend-inner-icon="mdi-lock"
              outlined
              dense
              required
            ></v-text-field>
  
            <v-checkbox v-model="rememberMe" label="Recuerdame" class="my-4"></v-checkbox>
  
            <v-btn color="primary" block class="button-same-size mb-4" type="submit" :disabled="loading">
              Entrar
            </v-btn>
  
            <v-alert v-if="errorMessage" type="error" class="mt-4">{{ errorMessage }}</v-alert>
  
            <v-btn text color="primary" class="button-same-size mb-4" @click="forgotPassword">
              OLVIDO LA CONTRASEÑA?
            </v-btn>
  
            <v-divider></v-divider>
  
            <v-btn color="secondary" block class="button-same-size my-4" @click="createAccount">
              CREAR UNA CUENTA
            </v-btn>
  
            <div class="text-center mb-4"></div>
  
<!--             <v-btn color="blue" block class="button-same-size mb-2" outlined @click="loginWithGoogle">
              <v-icon left>mdi-google</v-icon> Login with Google
            </v-btn>
  
            <v-btn color="primary" block class="button-same-size" outlined @click="loginWithMicrosoft">
              <v-icon left>mdi-microsoft</v-icon> Login with Microsoft
            </v-btn> -->
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  const apiUrl = process.env.VUE_APP_API_URL;

  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        rememberMe: false,
        loading: false,
        errorMessage: ''
      };
    },
    methods: {
      async login() {
        this.loading = true;
        this.errorMessage = ''; // Resetear el mensaje de error en cada intento
  
        try {
          const response = await axios.post(`${apiUrl}/api/users/authenticate`, {
            correo: this.email,
            passuser: this.password
          });
  
          const userData = {
          age: response.data.user.edad,
          weight: response.data.user.pesoKg,
          height: response.data.user.estaturacm,
          gender: response.data.user.genero,
          ethnicity: response.data.user.etnia,
         };

         console.log(userData)
         this.$store.dispatch('setUserData', userData);  // Guardamos en Vuex

          // Si la autenticación es exitosa, guarda el token en el localStorage o sessionStorage
          const token = response.data.token;
          localStorage.setItem('auth_token', token); // Almacena el token en el almacenamiento local
  
          // Redirige al Dashboard
          this.$router.push({ name: 'Dashboard' });
        } catch (error) {
          // Manejar error de autenticación
          this.errorMessage = error.response?.data?.message || 'Error al autenticar el usuario';
        } finally {
          this.loading = false; // Termina la carga
        }
      },
  
      forgotPassword() {
        this.$router.push({ name: 'ForgotPassword' });
      },
      createAccount() {
        this.$router.push({ name: 'Registro' });
      },
      loginWithGoogle() {
        console.log('Iniciar sesión con Google');
      },
      loginWithMicrosoft() {
        console.log('Iniciar sesión con Microsoft');
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
    background-image: url('../../images/fondo3.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
  }
  
  .v-card {
    max-width: 400px;
    width: 100%;
  }
  
  .button-same-size {
    width: 100%;
  }
  </style>
  