<template>
    <v-container class="d-flex justify-center align-center fill-height background-image">
      <v-col cols="12" md="8">
        <v-card class="pa-4" elevation="10">
          <v-card-title class="justify-center">
            <h2>Registro de Usuario</h2>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <!-- Aquí va el contenido de tu formulario -->
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field v-model="user.nombres" label="Nombres" :rules="[rules.required]" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="user.apellidos" label="Apellidos" :rules="[rules.required]" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field v-model="user.dpi" label="DPI" :rules="[rules.required]" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="user.nit" label="NIT" :rules="[rules.required]" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field v-model="user.telefono" label="Teléfono" :rules="[rules.required]" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="user.direccion" label="Dirección" :rules="[rules.required]" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field v-model="user.correo" label="Correo Electrónico" :rules="[rules.required, rules.email]" />
                </v-col>
                <v-col cols="12" md="6">
                  <!-- Campo para la contraseña y checkbox para mostrar -->
                  <v-row align="center" no-gutters>
                    <v-col cols="10">
                      <v-text-field
                        v-model="user.passuser"
                        :type="showPassword ? 'text' : 'password'"  
                        label="Contraseña"
                        :rules="[rules.required]"
                        hint="La contraseña debe ser al menos 8 caracteres"
                        counter
                        dense
                      />
                    </v-col>
                    <v-col cols="2" class="d-flex align-center">
                      <v-checkbox
                        v-model="showPassword"
                        label="Show"
                        hide-details
                        dense
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <!-- resto del codigo -->
              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    v-if="paises.length > 0"
                    v-model="user.pais"
                    :items="paises"
                    label="País"
                    item-title="nombre"
                    item-value="id_pais"
                    :rules="[rules.required]"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="user.region"
                    :items="regiones"
                    label="Región"
                    item-title="nombre"
                    item-value="id_region"
                    :rules="[rules.required]"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-select v-model="user.etnia" :items="etnias" label="Etnia" item-title="nombre" item-value="id_etnia" :rules="[rules.required]" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-select v-model="user.genero" :items="generoOptions" label="Género" :rules="[rules.required]" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field v-model="user.edad" label="Edad" type="number" :rules="[rules.required]" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="user.pesoKg" label="Peso (kg)" type="number" :rules="[rules.required]" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field v-model="user.estaturacm" label="Estatura (cm)" type="number" :rules="[rules.required]" />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <!-- Contenedor para los botones alineados a la derecha -->
          <v-card-actions class="d-flex justify-end">
            <v-btn color="primary" @click="submit" elevation="4" class="ma-2">Enviar</v-btn>
            <v-btn color="secondary" @click="resetForm" elevation="4" class="ma-2">Limpiar</v-btn>
            <v-btn color="#42A5F5" @click="goToHomePage" elevation="4" class="ma-2">Regresar</v-btn>


          </v-card-actions>
        </v-card>
      </v-col>
  <!-- Dialog para mostrar el mensaje de éxito en el centro de la pantalla -->
  <v-dialog v-model="dialog" max-width="400" persistent>
      <v-card>
        <v-card-title class="headline">¡Usuario creado exitosamente!</v-card-title>
        <v-card-text>
          <p>El registro fue realizado con éxito.</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="goToHomePage">Regresar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog para mostrar el mensaje de error en el centro de la pantalla -->
    <v-dialog v-model="errorDialog" max-width="400" persistent>
      <v-card>
        <v-card-title class="headline">¡Error!</v-card-title>
        <v-card-text>
          <p>{{ errorMessage }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" @click="closeErrorDialog">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-container>
  </template>
 <script>
 import axios from 'axios';
 
 export default {
   data() {
     return {
       valid: false,
       showPassword: false,  // Controla la visibilidad de la contraseña
       user: {
         nombres: '',
         apellidos: '',
         dpi: '',
         nit: '',
         telefono: '',
         direccion: '',
         correo: '',
         passuser: '',  // Contraseña
         pais: null,
         region: null,
         etnia: null,
         genero: '',
         edad: null,
         pesoKg: null,
         estaturacm: null,
         rol: 1,  // Valor por defecto para el rol
       },
       paises: [],
       regiones: [],
       etnias: [],
       generoOptions: ['M', 'F'],
       dialog: false,  // Controla la visibilidad del diálogo de éxito
      errorDialog: false,  // Controla la visibilidad del diálogo de error
      errorMessage: '',  // Contiene el mensaje de error
      rules: {
        required: value => !!value || 'Campo obligatorio',
        email: value => /.+@.+\..+/.test(value) || 'Email inválido',
      },
    };
  },
   mounted() {
     this.fetchPaises();
     this.fetchEtnias();
   },
   methods: {
     async fetchPaises() {
       try {
         const response = await axios.get('http://localhost:3000/api/paises');
         this.paises = response.data;
       } catch (error) {
         console.error('Error al cargar los países:', error);
       }
     },
     async fetchRegiones() {
       this.regiones = [];
       if (this.user.pais) {
         try {
           const response = await axios.get(`http://localhost:3000/api/regiones/pais/${this.user.pais}`);
           this.regiones = response.data;
         } catch (error) {
           console.error('Error al cargar las regiones:', error);
         }
       }
     },
     async fetchEtnias() {
       try {
         const response = await axios.get('http://localhost:3000/api/etnias');
         this.etnias = response.data;
       } catch (error) {
         console.error('Error al cargar las etnias:', error);
       }
     },
     async submit() {
      if (this.$refs.form.validate()) {
        try {
          const response = await axios.post('http://localhost:3000/api/users/create', this.user);
          this.dialog = true;  // Mostrar el diálogo de éxito
          this.resetForm();  // Limpiar el formulario
        } catch (error) {
          console.error('Error al registrar el usuario:', error);
          this.errorMessage = error.response?.data?.message || 'Ha ocurrido un error al procesar el registro';
          this.errorDialog = true;  // Mostrar el diálogo de error
        }
      } else {
        this.errorMessage = 'Por favor, completa todos los campos requeridos.';
        this.errorDialog = true;  // Mostrar el diálogo de error si no pasa la validación
      }
    },
     resetForm() {
       this.$refs.form.reset();
       this.user = {  // Resetear los valores del formulario
         nombres: '',
         apellidos: '',
         dpi: '',
         nit: '',
         telefono: '',
         direccion: '',
         correo: '',
         passuser: '',
         pais: null,
         region: null,
         etnia: null,
         genero: '',
         edad: null,
         pesoKg: null,
         estaturacm: null,
         rol: 1,
       };
     },
     // Método para redirigir a la página principal
     goToHomePage() {
       this.dialog = false;  // Ocultar el diálogo
       this.$router.push('/');  // Redirigir a la página principal (login)
     },
     // Método para cerrar el diálogo de error
    closeErrorDialog() {
      this.errorDialog = false;
    }
   },
   watch: {
     'user.pais': async function(newValue) {
       this.regiones = [];  // Limpiar las regiones anteriores
       this.user.region = null;  // Limpiar la región actual (valor incorrecto)
       if (newValue) {
         await this.fetchRegiones();  // Llamar a fetchRegiones para cargar las nuevas regiones
       }
     }
   },
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
 
 /* Estilo adicional para la tarjeta */
 .v-card {
   border-radius: 8px;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
 }
 
 /* Ajuste del campo de contraseña */
 .v-text-field.dense {
   margin-bottom: 0;
   width: 100%;
 }
 
 /* Asegura que los botones se alineen a la derecha */
 .v-card-actions {
   display: flex;
   justify-content: flex-end;
   padding: 16px;
 }
 
 .v-btn {
   margin-top: 8px;
 }
 </style>