<template>
  <v-container fluid class="dashboard-container">
    <!-- Barra de encabezado con datos del usuario -->
    <v-app-bar app color="white" dark>
      <v-img
        src="../../images/fishbone-logo.jpg"
        :min-width="isMobile ? 100 : 900"
        class="mr-4 logo"
      ></v-img>

      <template v-if="isMobile">
        <v-btn icon @click="showPatientInfo = !showPatientInfo">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>

      <!-- Datos dinámicos (Edad, Género, Peso, Estatura, Etnia) -->
      <template v-else>
        <v-spacer></v-spacer>

        <v-select
          v-model="selectedGender"
          :items="genders"
          label="Género"
          class="mr-3"
          outlined
          dense
          :disabled="true"
        ></v-select>
        <v-text-field
          v-model="age"
          label="Edad"
          class="mr-3"
          outlined
          dense
          :disabled="true"
        ></v-text-field>
        <v-text-field
          v-model="weight"
          label="Peso (kgs)"
          class="mr-3"
          outlined
          dense
          :disabled="true"
        ></v-text-field>
        <v-text-field
          v-model="height"
          label="Estatura (cm)"
          class="mr-3"
          outlined
          dense
          :disabled="true"
        ></v-text-field>
        <v-select
          v-model="selectedEthnicity"
          :items="ethnicities"
          label="Etnia"
          outlined
          dense
          :disabled="true"
        ></v-select>
        <v-btn :href="'/'" color="primary" class="mr-3">
          <v-icon left>mdi-logout</v-icon>
          Salir
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="showPatientInfo" temporary right>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">Datos del Paciente</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Campos de datos -->
        <v-list-item>
          <v-select
            v-model="selectedGender"
            :items="genders"
            label="Género"
            outlined
            dense
            :disabled="true"
          ></v-select>
        </v-list-item>
        <v-list-item>
          <v-text-field v-model="age" label="Edad" outlined dense :disabled="true"></v-text-field>
        </v-list-item>
        <v-list-item>
          <v-text-field v-model="weight" label="Peso (kgs)" outlined dense :disabled="true"></v-text-field>
        </v-list-item>
        <v-list-item>
          <v-text-field v-model="height" label="Estatura (cm)" outlined dense :disabled="true"></v-text-field>
        </v-list-item>
        <v-list-item>
          <v-select v-model="selectedEthnicity" :items="ethnicities" label="Etnia" outlined dense :disabled="true"></v-select>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Cuerpo Principal -->
    <v-row class="mt-5">
      <!-- Publicidad Izquierda -->
      <v-col cols="1" class="advertisement advertisement-left" v-if="!isMobile"></v-col>

      <!-- Panel Principal -->
      <v-col :cols="isMobile ? 12 : 10">
        <v-row class="expanded-row">
          <v-col :cols="isMobile ? 12 : 6">
            <v-card
              color="blue"
              class="white--text card-size cbc-analyzer"
              @click="goToPage('CbcAnalyzer')"
            >
              <v-card-title class="card-title">CBC Analyzer</v-card-title>
            </v-card>
          </v-col>
          <v-col :cols="isMobile ? 12 : 6">
            <v-card
              color="green"
              class="white--text card-size bmp-analyzer"
              @click="goToPage('BmpAnalyzer')"
            >
              <v-card-title class="card-title">BMP/CHEM Analyzer</v-card-title>
            </v-card>
          </v-col>
          <v-col :cols="isMobile ? 12 : 6">
            <v-card color="gray" class="white--text card-size" @click="goToPage('other')"></v-card>
          </v-col>
          <v-col :cols="isMobile ? 12 : 6">
            <v-card
              color="orange"
              class="white--text card-size acid-base-analyzer"
              @click="goToPage('abgAnalyzer')"
            >
              <v-card-title class="card-title">Acid Base Analyzer</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- Publicidad Derecha -->
      <v-col cols="1" class="advertisement advertisement-right" v-if="!isMobile"></v-col>
    </v-row>

    <!-- Publicidad Inferior -->
    <v-row class="advertisement advertisement-bottom mt-4">
      <v-col cols="12"></v-col>
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

        isMobile() {
        return this.$vuetify.display.mdAndDown;
        }, 
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
        handleLogout() {
          console.log("Botón de logout clickeado");
          this.$router.push({ name: 'Login' });
        }



      },
    };
</script>
  
<style scoped>


.advertisement-left {
  background-image: url('../../images/izquierda.avif'); /* Cambia a la ruta de tu imagen o GIF */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 50em; /* Altura fija */
  max-width: 100%; /* Asegura que no desborde horizontalmente */
  overflow: hidden;
}

.advertisement-right {
  background-image: url('../../images/prb.avif'); /* Cambia a la ruta de tu imagen o GIF */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 50em; /* Altura fija */
  max-width: 100%; /* Asegura que no desborde horizontalmente */
  overflow: hidden;
}

.advertisement-bottom {
  background-image: url('../../images/bajamicro.jpg'); /* Cambia a la ruta de tu imagen o GIF */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 5%; /* Altura fija */
  max-width: 100%; /* Asegura que no desborde horizontalmente */
  overflow: hidden;
}

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
  