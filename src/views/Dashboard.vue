<template>
    <v-container fluid class="dashboard-container">
      <!-- Header -->
      <v-app-bar app color="white" dark @click="goToDashboard">
        <v-img src="../../images/fishbone-logo.jpg" max-width="100" class="mr-4"></v-img>
        <v-spacer></v-spacer>
        <!-- Datos Dinámicos (Solo Lectura) -->
        <v-select
          v-model="selectedGender"
          :items="genders"
          label="Género"
          class="mr-3"
          outlined
          dense
          :disabled="true"
        ></v-select>
        <v-text-field v-model="age" label="Edad" class="mr-3" outlined dense :disabled="true"></v-text-field>
        <v-text-field v-model="weight" label="Peso (kgs)" class="mr-3" outlined dense :disabled="true"></v-text-field>
        <v-text-field v-model="height" label="Estatura (cm)" class="mr-3" outlined dense :disabled="true"></v-text-field>
        <v-select
          v-model="selectedEthnicity"
          :items="ethnicities"
          label="Etnia"
          outlined
          dense
          :disabled="true"
        ></v-select>
      </v-app-bar>
  
      <!-- Cuerpo -->
      <v-row class="mt-5">
        <!-- Publicidad Izquierda -->
        <v-col cols="1" class="advertisement">
          <h1>Espacio publicidad</h1>
        </v-col>
  
        <!-- Panel Principal -->
        <v-col cols="10">
          <v-row class="expanded-row">
            <v-col cols="6">
              <v-card color="blue" class="white--text card-size cbc-analyzer" @click="goToPage('CbcAnalyzer')">
                <v-card-title class="card-title">CBC Analyzer</v-card-title>

              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card color="green" class="white--text card-size bmp-analyzer" @click="goToPage('BmpAnalyzer')">
                <v-card-title class="card-title">BMP/CHEM Analyzer</v-card-title>

              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card color="gray" class="white--text card-size" @click="goToPage('other')">
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card color="orange" class="white--text card-size acid-base-analyzer" @click="goToPage('acid-base')">
                <v-card-title class="card-title">Acid Base Analyzer</v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
  
        <!-- Publicidad Derecha -->
        <v-col cols="1" class="advertisement">
          <h1>Espacio publicidad</h1>
        </v-col>
      </v-row>
  
      <!-- Publicidad Inferior -->
      <v-row class="advertisement mt-4">
        <v-col cols="12">
          <h1>Espacio Publicidad</h1>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
<script>
    import { mapState } from 'vuex';
    
    export default {
      data() {
        return {
          selectedGender: null,
          selectedEthnicity: null,
          age: null,
          weight: null,
          height: null,
          genders: ["Masculino", "Femenino"],
          ethnicities: [] // Puedes rellenarlo con valores si es necesario
        };
      },
      computed: {
        ...mapState({
          user: (state) => state.user,
        }),
      },
      watch: {
        user: {
          handler(newUserData) {
            this.selectedGender = newUserData.gender;
            this.age = newUserData.age;
            this.weight = newUserData.weight;
            this.height = newUserData.height;
            this.selectedEthnicity = newUserData.ethnicity;
          },
          immediate: true, // Asegúrate de actualizar los datos de inmediato
        },
      },
      methods: {
        goToDashboard() {
          this.$router.push({ name: 'Dashboard' });
        },
        goToPage(page) {
          this.$router.push({ name: page });
        },
      },
    };
</script>
  
<style scoped>

.cbc-analyzer {
  background-image: url('../../images/analyzer_cbc.png');
  background-size: cover;
  background-position: center;
  color: white;
}

.bmp-analyzer {
  background-image: url('../../images/analyzer_bmp.png');
  background-size: cover;
  background-position: center;
  color: white;
}


.acid-base-analyzer {
  background-image: url('../../images/abg.png');
  background-size: 80%; /* Ajusta el tamaño al 80% del contenedor */
  background-repeat: no-repeat; /* Evita repeticiones de la imagen */
  background-position: center; /* Centra la imagen */
  background-color: orange; /* Color de fondo visible detrás de la imagen */
  color: white;
}


    .large-image {
      width: 80%; /* Ajusta el porcentaje según el tamaño deseado */
      height: auto; /* Mantiene la proporción de la imagen */
      object-fit: contain; /* Esto asegura que la imagen se ajuste dentro del espacio asignado sin distorsionarse */
    }
    .card-content {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0; /* Asegura que no haya espacio alrededor */
      height: 100%; /* Haz que el contenido ocupe todo el espacio de la tarjeta */
    }

    .card-size {
      height: calc(35vh); /* Mantiene la altura de la tarjeta */
      display: flex;
      flex-direction: column;
      justify-content: space-between; /* Asegura que el contenido se distribuya verticalmente */
    }

    .card-title {
        font-size: 2.2em;
        text-align: center;
        padding: 8px;
        color: white !important; /* Asegura que el texto sea blanco */
    }

      .expanded-row {
        height: 80vh; /* Esto hace que el v-row ocupe el 80% de la altura de la pantalla */
      }
      .dashboard-container {
        background-color: #f0f0f0;
      }
      
      .advertisement {
        background-color: #d3d3d3;
        min-height: 100px;
      }
</style> 
  