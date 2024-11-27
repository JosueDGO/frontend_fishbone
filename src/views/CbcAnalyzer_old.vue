<!-- hasta aca los cambios -->
<template>
  <v-container fluid class="cbc-analyzer-container">
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
        <v-select v-model="selectedGender" :items="genders" label="Género" outlined dense :disabled="true" class="mr-3"></v-select>
        <v-text-field v-model="age" label="Edad" outlined dense :disabled="true" class="mr-3"></v-text-field>
        <v-text-field v-model="weight" label="Peso (kgs)" outlined dense :disabled="true" class="mr-3"></v-text-field>
        <v-text-field v-model="height" label="Estatura (cm)" outlined dense :disabled="true" class="mr-3"></v-text-field>
        <v-select v-model="selectedEthnicity" :items="ethnicities" label="Etnia" outlined dense :disabled="true"></v-select>
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
          <v-select v-model="selectedGender" :items="genders" label="Género" outlined dense :disabled="true"></v-select>
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
      <!-- Publicidad Izquierda (Visible solo en pantallas grandes) -->
      <v-col cols="12" sm="1" class="advertisement left-ad" v-if="!isMobile">
        <h1>Espacio publicidad</h1>
      </v-col>

      <!-- Panel Principal -->
      <v-col :cols="isMobile ? 12 : 10">
        <v-row style="margin: 0;" class="flex-container">
          <!-- Izquierda 70% -->
          <v-col :cols="isMobile ? 12 : 7" class="principal">
            <v-card class="analyzer-card" style="border-radius: 4em;">
              <v-card-title class="text-center" style="font-size:3em; font-family:Georgia, 'Times New Roman', Times, serif;">Analizador CBC</v-card-title>
              <!-- Fishbone Analyzer Diagram -->
              <div class="fishbone-container">
                <v-text-field v-model="fields.wbc" label="Wbc" outlined dense class="fishbone-input wbc"></v-text-field>
                <v-text-field v-model="fields.neut" label="Neut" outlined dense class="fishbone-input neut"></v-text-field>
                <v-text-field v-model="fields.lym" label="Lym" outlined dense class="fishbone-input lym"></v-text-field>
                <v-text-field v-model="fields.hb" label="Hb (g/dL)" outlined dense class="fishbone-input hb"></v-text-field>
                <v-text-field v-model="fields.mcv" label="MCV (fL)" outlined dense class="fishbone-input mcv"></v-text-field>
                <v-text-field v-model="fields.mch" label="MCH" outlined dense class="fishbone-input mch"></v-text-field>
                <v-text-field v-model="fields.plt" label="Plt" outlined dense class="fishbone-input plt"></v-text-field>
              </div>
            </v-card>
          </v-col>

          <!-- Derecha 30% -->
          <v-col :cols="isMobile ? 12 : 5" class="right-panel">
            <v-card class="data-card" style="max-height:fit-content">
              <v-card-title class="text-center" style="background-color:transparent; font-size:2.5em ; color: white;">Diagnóstico</v-card-title>
              <v-row dense style="align-items: center">
                <v-col cols="12" v-for="(item, index) in additionalData" :key="index">
                  <v-card class="data-box" outlined v-if="item.value">
                    <v-card-actions>
                      <!-- Botón que abre el banner -->
                      <v-btn text color="primary" @click="openBanner(item.label, item.value);">
                        Ver más detalles
                      </v-btn>
                    </v-card-actions>
                    <v-card-text class="diagnosis-text">{{ item.label }}: {{ item.value }}</v-card-text>
                  </v-card>
                </v-col>      
              </v-row>

                <!-- Dialogo para mostrar el "banner" -->
                <v-dialog v-model="showBanner" max-width="600">
                  <v-card class="banner-card">
                    <v-card-title class="headline">{{ selectedLabel }}</v-card-title>
                    <v-card-text>
                      <v-expansion-panels>
                        <v-expansion-panel v-for="(info, i) in bannerData" :key="i">
                          <v-expansion-panel-header>{{ info.title }}</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-list>
                              <v-list-item v-for="(detail, j) in info.details" :key="j">
                                {{ detail }}
                              </v-list-item>
                            </v-list>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn color="primary" text @click="showBanner = false">Cerrar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

              <v-card class="data-box" outlined v-if="infusionRate">
                <v-card-text>Tasa de Infusión: {{ infusionRate }}</v-card-text>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- Publicidad Derecha (Visible solo en pantallas grandes) -->
      <v-col cols="12" sm="1" class="advertisement right-ad" v-if="!isMobile">
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

<!-- un cambio mas arriba -->
<script>
export default {
  data() {
    return {
      showBanner: false, // Estado del banner
      selectedLabel: "", // Etiqueta seleccionada
      bannerData: [], // Información detallada del banner

      showPatientInfo: false,
      fields: {
        wbc: '',
        neut: '',
        lym: '',
        hb: '',
        mcv: '',
        mch: '',
        plt: ''
      },
      selectedGender: null,
      age: null,
      weight: null,
      height: null,
      selectedEthnicity: null,

      diagnosisOne: '',
      diagnosisOneDesc: '',
      diagnosisPlt: '',
      diagnosisPltDesc: '',
      additionalData: [
        { label: 'Diagnóstico Hb', value: '' },
        { label: 'Diagnóstico Plt', value: '' },
        { label: 'Diagnóstico WBC', value: '' },
        { label: 'Diagnóstico Neut', value: '' },
        { label: 'Diagnóstico Lym', value: '' },
        { label: 'Diagnóstico MCV', value: '' },
        { label: 'Diagnóstico MCH', value: '' },
        { label: 'Diagnóstico combinado', value: '' }
      ],
      // Variables necesarias para la tasa de infusión
      genderVal: null,
      weightVal: null,
      ageVal: null,
      ivna: null,
      ivk: null,
      naChange: null,
      infusionRate: null, // Para guardar la tasa de infusión calculada
      individualDiagnoses: [] // Nuevo arreglo para guardar diagnósticos individuales
    };
  },
  computed: {

    isMobile() {
      return this.$vuetify.display.mdAndDown;
    },

    // Lógica para calcular diagnósticos según los valores
    diagnosis() {
        const hbVal = this.convertToNumber(this.fields.hb);
        const wbcVal = this.convertToNumber(this.fields.wbc);
        const neutVal = this.convertToNumber(this.fields.neut);
        const lymVal = this.convertToNumber(this.fields.lym);
        const mcvVal = this.convertToNumber(this.fields.mcv);
        const mchVal = this.convertToNumber(this.fields.mch);
        const pltVal = this.convertToNumber(this.fields.plt);

        this.additionalData[0].value = hbVal ? this.evaluateHb(hbVal) : '';
        this.additionalData[1].value = pltVal ? this.evaluatePlt(pltVal) : '';
        this.additionalData[2].value = wbcVal ? this.evaluateWbc(wbcVal) : '';
        this.additionalData[3].value = neutVal ? this.evaluateNeut(neutVal) : '';
        this.additionalData[4].value = lymVal ? this.evaluateLym(lymVal) : '';
        this.additionalData[5].value = mcvVal ? this.evaluateMCV(mcvVal) : '';
        this.additionalData[6].value = mchVal ? this.evaluateMCH(mchVal) : '';
        this.additionalData[7].value = this.addevaluated();
    }

  },
  methods: {

    openBanner(label, value) {
    
      /* label es el titulo y value es el nombre de la enf */
      console.log(value)
      this.selectedLabel = label;
      this.showBanner = true;

      if (value === "Anemia") {
          this.bannerData = [
            {
              title: "Differential Diagnosis",
              details: ["Iron deficiency anemia", "Anemia of inflammation","Anemia of renal disease","Acute bleeding"],
            },
            {
              title: "Workup",
              details: ["Rule out iron deficiency", "Rule out thalassemia","Anemia of chronic kidney disease","Anemia of inflammation / chronic disease","Acute bleeding"],
            },
          ];
      }else if (value === "Leukocytosis") {
          this.bannerData = [
            {
              title: "Possible Causes",
              details: ["Infection", "Inflammation", "Leukemia"],
            },
          ];
        } else if(value === "Microcítica"){
          this.bannerData = [
            {
              title: "Differential Diagnosis",
              details: ["Iron deficiency anemia", "Anemia of inflammation","Sideroblastic anemia","Thalassemia"],
            },
            {
              title: "Workup",
              details: ["Iron deficiency", "Thalassemia","Anemia of inflammation"],
            },
          ];

        } 
        else {
        this.bannerData = [
          {
            title: "Informacion Pendiente de mostrar",
            details: ["Datos recolectados de la BD()"],
          },
        ];
      }
    },

    fieldLabel(field) {
      const labels = {
        hb: 'Hb (g/dL)',
        wbc: 'WBC',
        neut: 'Neut',
        lym: 'Lym',
        mcv: 'MCV (fL)',
        mch: 'MCH',
        plt: 'Plt'
      };
      return labels[field] || field;
    },

    addevaluated() {
      const hbVal = this.convertToNumber(this.fields.hb);
      const mcvVal = this.convertToNumber(this.fields.mcv);
      const pltVal = this.convertToNumber(this.fields.plt);
      const wbcVal = this.convertToNumber(this.fields.wbc);
      const mchVal = this.convertToNumber(this.fields.mch);

      if (hbVal < 14 && mchVal < 27) return 'Hypo-Chromic anemia';
      else if (hbVal < 13 && mchVal > 26 && mchVal <33) return 'Hyper-chromic anemia';
      else if (hbVal < 13 && mcvVal < 80) return 'Microcytic anemia';
      else if (hbVal < 13 && mcvVal > 100) return 'Macrocytic anemia';
      else if (hbVal < 13 && mcvVal < 80 && mchVal < 27) return 'Microcityc hypo-chromic anemia';
      else if (hbVal < 13 && mcvVal > 100 && mchVal > 33) return 'Macrocityc hypo-chromic anemia';
      else if (hbVal < 13 && mcvVal > 80 && mcvVal < 100 && mchVal < 27)
        return 'Normocityc hypo-chromic anemia';
      else if (hbVal < 13 && mcvVal < 80 && mchVal > 27 && mchVal < 33)
        return 'Hypocromic-normocitic anemia';
      else if (hbVal < 13 && pltVal < 141 && wbcVal < 4001) return 'Pancytopenia';
      return ''; // Devuelve un valor vacío si no se cumple ninguna condición
    },


    convertToNumber(value) {
      if (typeof value === 'string' && value.endsWith('K')) {
        return parseInt(value.slice(0, -1)) * 1000;
      }
      return parseFloat(value);
    },
    resetForm() {
      for (let field in this.fields) {
        this.fields[field] = ''; // Reset all fields to empty
      }
    },

    // Métodos de evaluación para cada campo

    evaluateHb(hbVal) {
      if (hbVal < 13.8) return 'Anemia';
      else if (hbVal > 17.2) return 'Polycythemia';
      return 'Normal';
    },
    evaluateWbc(wbcVal) {
      if (wbcVal < 4000) return 'Leucopenia';
      else if (wbcVal > 11000) return 'Leucocitosis';
      return 'Normal';
    },
    evaluateNeut(neutVal) {
      if (neutVal < 40) return 'Neutropenia';
      else if (neutVal > 80) return 'Neutrofilia';
      return 'Normal';
    },
    evaluateLym(lymVal) {
      if (lymVal < 900) return 'Linphophenia';
      else if (lymVal > 7000) return 'Linfocitosis';
      return 'Normal';
    },
    evaluateMCV(mcvVal) {
      if (mcvVal < 80) return 'Microcítica';
      else if (mcvVal > 100) return 'Macrocítica';
      return 'Normal';
    },
    evaluateMCH(mchVal) {
      if (mchVal < 27) return 'Hipocrómica';
      return 'Normal';
    },
    evaluatePlt(pltVal) {
      if (pltVal < 150000) return 'Trombocitopenia';
      else if (pltVal > 350000) return 'Trombocitosis';
      return 'Normal';
    },

    // Cálculo de la tasa de infusión
    calculateInfusionRate() {
      if (this.ageVal && this.weightVal && this.genderVal) {
        const naChange = this.naChange;
        const ivna = this.ivna;
        const ivk = this.ivk;
        const naValTemp = 140; // Usar un valor predeterminado para Na

        let waterFraction;
        if (this.ageVal < 60) {
          waterFraction = this.genderVal === "male" ? 0.6 : 0.5;
        } else {
          waterFraction = this.genderVal === "male" ? 0.5 : 0.45;
        }

        // Fórmula de ejemplo para la tasa de infusión
        const infusionRate = (1000 * naChange * (waterFraction * this.weightVal)) / (ivna + ivk - naValTemp);
        this.infusionRate = Math.round(infusionRate * 100) / 100;
        console.log('Tasa de Infusión:', this.infusionRate);
      } else {
        this.teaseBasicInfo();
      }
    },

    teaseBasicInfo() {
      alert('Complete los datos básicos de la persona antes de continuar.');
    }
  },

  watch: {
    fields: {
      handler() {
        this.diagnosis; // Trigger diagnosis recalculation whenever fields change
      },
      deep: true
    }
  },

  mounted() {
    // Asignar valores desde Vuex a las variables del componente
    this.selectedGender = this.$store.state.user.gender;
    this.age = this.$store.state.user.age;
    this.weight = this.$store.state.user.weight;
    this.height = this.$store.state.user.height;
    this.selectedEthnicity = this.$store.state.user.ethnicity;

  }
  
};

</script>

<style scoped>

.banner-card {
  background-image: url('../../images/fondo2.jpg');
  background-size: cover;
  background-position: center;
  color: white;
}

.banner-overlay {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 16px;
  border-radius: 8px;
}

.flex-container{
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.principal{
  flex: 1 0 140px;

}
.right-panel{
  background-color: transparent;
  flex: 1 0 120px;
}






/* Fondo completo para la página */
.cbc-analyzer-container {
  background-image: url('../../images/adn_cbc.jpg');
  background-size: cover;  /* Hace que la imagen de fondo cubra todo el área */
  background-position: center; /* Centra la imagen */
  min-height: 100vh; /* Hace que la altura mínima sea el 100% de la pantalla */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}



/* Estilos generales de la interfaz */
.cbc-analyzer-container {
  background-color: #f0f0f0;
}

.advertisement {
  background-color: #d3d3d3;
  opacity: 0.2;
  min-height: 2em;
  text-align: center;
}

.analyzer-card {
  background-color: transparent;
  color: white;
  padding: 20px;
  
  
}

/* Estilos del diagrama tipo fishbone */
.fishbone-container {
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #00aaff; */
  background-image: url('../../images/analyzer_cbc.png');
  background-size: 90%;
  background-position: center 100%; 
  background-repeat: no-repeat;
  border-radius: 1em;
}

.fishbone-input {
  position: absolute;
  /* width: 80px; */
  text-align: center;
  background-color: white; 
  color:grey  ; 
  border-radius: 5%;
   font-weight:900; 
   max-height: 3em; 
   min-width: 5.5em;
}

.data-box {
  background-color: white;  /* Fondo blanco */
  border-radius: 12px;      /* Bordes redondeados */
  border: 1px solid #00aaff; /* Borde azul claro */
  margin-bottom: 10px;      /* Separación entre los cuadros */
  padding: 10px;
  text-align: center;
  max-width: 25em;
  align-items: center
}

/* Estilo para el texto dentro de los cuadros */
.diagnosis-text {
  color: #00aaff;          /* Color de texto celeste */
  font-weight: bold;       /* Texto en negrita */
  font-size: 1.2rem;       /* Aumentar tamaño de la fuente */
}

/* Contenedor donde se encuentra la imagen */
.fishbone-container {
  position: relative;
  width: 100%;
  height: 400px;  /* Mantén un tamaño adecuado o ajusta */
  background-color: #00aaff; /* Opcional, para que puedas ver el área de la imagen */
}

/* Estilo de la imagen */
.analyzer-background {
  position: absolute;
  top: -60px;  /* La imagen comienza en la parte superior */
  left: 45%; /* Centrado horizontalmente */
  transform: translateX(-50%);  /* Asegura que esté completamente centrada */
  width: 100%;  /* O puedes ajustar el ancho según sea necesario */
  height: auto; /* Mantiene las proporciones de la imagen */
}

.data-card{
  background-color: transparent; /* Fondo semi-transparente */
}

/* Media Queries para pantallas más pequeñas */
/* Media Queries para pantallas más pequeñas */
@media( min-width:900px){

  /* Posicionamiento de cada cuadro de entrada en el diagrama */
  .wbc { top: 35%; left: 17%; }
  .neut { top: 67%; left: 13%; }
  .lym { top: 80%; left: 13%; }
  .hb { top: 20%; right: 44%; }
  .mcv { top: 50%; right: 44%;  }
  .mch { top: 65%; right: 44%;}
  .plt { bottom: 53%; right: 18%;}

}

@media (max-width: 900px) {
  .fishbone-container {
    background-image: none; /* Solo oculta la imagen de fondo, no el contenedor */
    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: auto;
    flex-wrap: wrap;
    gap:8px;

  }

  .fishbone-input {
    position: relative;
    width: 90%;
    margin: 5px 0;  
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }


  .flex-container {
    display: flex;
    flex-direction: column; /* Cambia a columna */
    align-items: center;
  }

  .principal {
    width: 100%;
  }

  .right-panel {
    width: 100%;
  }

  .advertisement.left-ad {
    order: -1; /* Coloca la publicidad izquierda arriba */
  }

  .advertisement.right-ad {
    order: 2; /* Coloca la publicidad derecha abajo */
  }

  .logo {
    width: 100px; /* Hace el logo más pequeño en pantallas pequeñas */
    margin-left: 0;
    margin-right: auto;
  }

  .advertisement h1 {
    font-size: 1.5em; /* Reduce el tamaño del texto en la publicidad */
  }

  .data-card {
    padding: 15px;
  }

  .diagnosis-text {
    font-size: 1rem; /* Ajusta el tamaño del texto de diagnóstico */
  }

  .data-box {
    font-size: 0.9em; /* Ajusta el tamaño de las cajas de datos */
  }

  .analyzer-card {
    padding: 10px;
  }
}



</style>
