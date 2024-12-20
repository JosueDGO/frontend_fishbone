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
          <v-btn @click="$router.push({ name: 'Dashboard' })" color="primary" class="mr-3">
          <v-icon left>mdi-arrow-left</v-icon>  <!-- Puedes usar otro icono si lo prefieres -->
          Regresar
          </v-btn>
          <v-select v-model="selectedGender" :items="genders" label="Género" outlined dense :disabled="true" class="mr-3"></v-select>
          <v-text-field v-model="age" label="Edad" outlined dense :disabled="true" class="mr-3"></v-text-field>
          <v-text-field v-model="weight" label="Peso (kgs)" outlined dense :disabled="true" class="mr-3"></v-text-field>
          <v-text-field v-model="height" label="Estatura (cm)" outlined dense :disabled="true" class="mr-3"></v-text-field>
          <v-select v-model="selectedEthnicity" :items="ethnicities" label="Etnia" outlined dense :disabled="true"></v-select>
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
        </v-col>
  
        <!-- Panel Principal -->
        <v-col :cols="isMobile ? 12 : 10">
          <v-row style="margin: 0;" class="flex-container">
            <!-- Izquierda 70% -->
            <v-col :cols="isMobile ? 12 : 7" class="principal">
              
              <v-card class="analyzer-card" style="border-radius: 4em;">
                <v-card-title class="text-center" style="font-size:3em; font-family:Georgia, 'Times New Roman', Times, serif;">Analizador ABG</v-card-title>
                <!-- Fishbone Analyzer Diagram --> 
                 
                <div class="fishbone-container">
                  <v-row class="mt-4" align="center" :justify="isMobile ? 'end' : 'start'">
  <v-col cols="auto">
    <v-btn @click="realizarcalculo" class="fishbone-input btn">
      Realizar Cálculo
    </v-btn>
  </v-col>
</v-row>

                  <v-text-field v-model="fields.ph" label="Ph" outlined dense class="fishbone-input ph"></v-text-field>
                  <v-text-field v-model="fields.paco2" label="PaCO2" outlined dense class="fishbone-input paco2"></v-text-field>
                  <v-text-field v-model="fields.alb" label="Alb" outlined dense class="fishbone-input alb"></v-text-field>
                  <v-text-field v-model="fields.na" label="Na(mEq/L)" outlined dense class="fishbone-input na"></v-text-field>
                  <v-text-field v-model="fields.cl" label="Cl(mEq/L)" outlined dense class="fishbone-input cl"></v-text-field>
                  <v-text-field v-model="fields.hco3" label="HCO3(mEq/L)" outlined dense class="fishbone-input hco3"></v-text-field>

                </div>
                <v-btn @click="clearFields" color="orange" class="mt-4" block>
                  Limpiar Campos
                </v-btn>

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
        </v-col>
      </v-row>
  
      <!-- Publicidad Inferior -->
      <v-row class="advertisement botton-ad mt-4">
        <v-col cols="12">
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
        aniongap:0,
        fields: {
          ph: '',
          paco2: '',
          alb: '',
          na: '',
          cl: '',
          hco3: ''
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

          { label: 'Anion Gap', value: '' },
          { label: 'Diagnóstico Ph', value: '' },
          { label: 'Diagnóstico PaCO2', value: '' },
          { label: 'Diagnóstico Alb', value: '' },
          { label: 'Diagnóstico Na', value: '' },
          { label: 'Diagnóstico Cl', value: '' },
          { label: 'Diagnóstico HCO3', value: '' },
          { label: 'Diagnostico Primario', value: '' },
          { label: 'Diagnostico Secundario', value: '' },
          
        ],
        // Variables necesarias para la tasa de infusión
        genderVal: null,
        weightVal: null,
        ageVal: null,
        ivna: null,
        ivk: null,
        naChange: null,
        infusionRate: null, // Para guardar la tasa de infusión calculada
        individualDiagnoses: [], // Nuevo arreglo para guardar diagnósticos individuales

        diagnostico1:'',
        diagnostico2:''
      };
    },
    computed: {
  
      isMobile() {
        return this.$vuetify.display.mdAndDown;
      }, 
  
      // Lógica para calcular diagnósticos según los valores
      diagnosis() {
        const ph = this.convertToNumber(this.fields.ph);
        const paco2 = this.convertToNumber(this.fields.paco2);
        const alb = this.convertToNumber(this.fields.alb);
        const na = this.convertToNumber(this.fields.na);
        const cl = this.convertToNumber(this.fields.cl);
        const hco3 = this.convertToNumber(this.fields.hco3);


        this.additionalData[0].value = this.calcularAnionGap();
        this.additionalData[1].value = ph  ? this.evaluateph(ph) : '';
        this.additionalData[2].value = paco2  ? this.evaluatepaco2(paco2) : '';
        this.additionalData[3].value = alb  ? this.evaluatealb(alb) : '';
        this.additionalData[4].value = na  ? this.evaluatena(na) : '';
        this.additionalData[5].value = cl  ? this.evaluatecl(cl) : '';
        this.additionalData[6].value = hco3  ? this.evaluatehco3(hco3) : '';
          
      }
  
    },
    methods: {

      clearFields() {
        // Limpiar los campos de texto
        this.fields.ph = '';
        this.fields.paco2 = '';
        this.fields.alb = '';
        this.fields.na = '';
        this.fields.cl = '';
        this.fields.hco3 = '';

        // Limpiar los datos dentro de additionalData
        this.additionalData.forEach(item => {
          if (item.label !== 'Diagnostico Primario' && item.label !== 'Diagnostico Secundario') {
            item.value = ''; // Limpiar solo los valores de los otros campos
          }
        });

        // Hacer desaparecer "Diagnóstico Primario" y "Diagnóstico Secundario"
        const primary = this.additionalData.find(item => item.label === 'Diagnostico Primario');
        const secondary = this.additionalData.find(item => item.label === 'Diagnostico Secundario');
        if (primary) {
          primary.value = '';
        }
        if (secondary) {
          secondary.value = '';
        }
      },
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
          ph: 'Ph',
          paco2: 'PaCO2',
          alb: 'Alb',
          na: 'Na',
          cl: 'Cl',
          hco3: 'HCO3'
        };
        return labels[field] || field;
      },
      
      calcularAnionGap() {
        // Convertir los valores de los campos a números
        const ph = this.convertToNumber(this.fields.ph);
        const paco2 = this.convertToNumber(this.fields.paco2);
        const alb = this.convertToNumber(this.fields.alb);
        const na = this.convertToNumber(this.fields.na);
        const cl = this.convertToNumber(this.fields.cl);
        const hco3 = this.convertToNumber(this.fields.hco3);

        // Inicializar el anion gap
        let aniongap = 0;


        // Calcular el anion gap básico
        aniongap = na - cl - hco3;

        // Ajustar el anion gap si la albumina es válida y menor que 4
        if (!isNaN(alb) && alb < 3.9) {
            console.log("Ajustando anion gap por albumina");
            aniongap += 2.4 * (alb-4);
        }

        console.log("este es aniongap", aniongap)
        return aniongap;
      },

      async addevaluated() {

        const ph = this.convertToNumber(this.fields.ph);
        const paco2 = this.convertToNumber(this.fields.paco2);
        const alb = this.convertToNumber(this.fields.alb);
        const na = this.convertToNumber(this.fields.na);
        const cl = this.convertToNumber(this.fields.cl);
        const hco3 = this.convertToNumber(this.fields.hco3);

        const aniongap = this.calcularAnionGap();
       

        let mensaje = ''
        let mensaje2 = ''
        let exphco3 = 0
        let expco2 = 0
        let deltadelta = 0

        
        if (aniongap>14){

          console.log("anion gap es mayor a 14")


          mensaje ='Anion Gap Metabolic Acidosis'
          deltadelta = (aniongap-12)+(hco3-24)

          if(deltadelta >=3){
            mensaje2 = 'Metabolic Alkalosis'
          }else if(deltadelta <3 || deltadelta >-3){
            mensaje2 = ''
          }else if(deltadelta <=-3){
            mensaje2 = 'Primary Metabolic Acidosis'
          }

          expco2 = (1.5*hco3)+8


        } 
        else if(aniongap<14){
          console.log("anion gap es menor a 14")

          if(hco3 >= 22 && hco3 <= 26){
            console.log("entre a esto entre 22 y 26 ")
            if(paco2>=43){
              console.log("pago es mayor a 43")
              if(ph<=7.27) 
              {
                mensaje ='Acute Respiratory Acidosis' 
                exphco3 = 24 + (paco2 -40 / 10)
              } 
              else if(ph>=7.28)
              {
                mensaje ='Chromic Respiratory Acidosis' 
                exphco3 = 24 + ((paco2 -40 / 10)*3)
              } 
              
            }else if(paco2>38 || paco2<42){
              mensaje = ''
            }else if(paco2 <=37){
              if(ph<=7.51) 
              {
                mensaje ='Respiratory Alkalosis' 
                exphco3 = 24 - ((paco2 -4 / 10)*5)
              } 
              else if(ph>=7.52)
              {
                mensaje ='Chromic Respiratory Alkalosis' 
                exphco3 = 24 - ((paco2 -4 / 10)*2)
              } 
            }

            let deltahco3=  hco3-exphco3 

            if(deltahco3>=3){
              mensaje2 = 'Metabolic Alkalosis'
            }else if (deltahco3 >= -2 && deltahco3 <= 2){
              mensaje2 = ''
            }else if(deltahco3<= -3){
              mensaje2='Metabolic Acidosis'
            }

          }else if(hco3 >= 27){
            console.log("hco3 es mayor o igual 27")
            expco2 =(0.7*(hco3-24))+40

            let deltapco2 = paco2 -expco2 
            if(deltapco2>=3){
              mensaje = 'Respiratory Acidosis'
            }else if(deltapco2>-2 || deltapco2<2 ){
              mensaje = ''
            }else if(deltapco2<=-3){
              mensaje ='Respiratory Alkalosis'
            }

          }else if(hco3<=21){
            console.log("hco3 es menor a 21")
            expco2 =(1.5*hco3)+8

            let deltapco2 = paco2 -expco2 
            console.log("esto es deltapaco2" ,deltapco2)
            
            if(deltapco2>=3){
              mensaje = 'Respiratory Acidosis'
            }else if(deltapco2>-2 || deltapco2<2 ){
              mensaje = ''
            }else if(deltapco2<=-3){
              mensaje ='Respiratory Alkalosis'
            }
          }

        }

        this.additionalData[7].value = mensaje || '';
        this.additionalData[8].value = mensaje2 || '';

        return { mensaje, mensaje2 };
      },
      
      realizarcalculo() {
        this.addevaluated();

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
  
      evaluateph(phval) {
        if (phval < 7.42) return 'Low';
        else if (phval > 7.37) return 'High';
        return 'Normal';
      },
      evaluatepaco2(paco2) {
        if (paco2 >= 42) return 'High';
        else if (paco2 <= 38) return 'Low';
        return 'Normal';
      },
      evaluatealb(albVal) {
        if (albVal >= 5.2) return 'High';
        else if (albVal <= 3.7) return 'High';
        return 'Normal';
      },
      evaluatena(naVal) {
        if (naVal >= 146) return 'High';
        else if (naVal <= 135) return 'Low';
        return 'Normal';
      },
      evaluatecl(clVal) {
        if (clVal >= 107) return 'High';
        else if (clVal <= 97) return 'Low';
        return 'Normal';
      },
      evaluatehco3(hco3Val) {
        if (hco3Val >= 26) return 'High';
        else if (hco3Val <= 22) return 'Low';

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
        handler: async function () {
          this.diagnosis

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
  
.botton-ad{
  background-image: url('../../images/bajamicro.jpg'); /* Cambia a la ruta de tu imagen o GIF */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 50em; /* Altura fija */
  max-width: 100%; /* Asegura que no desborde horizontalmente */
  overflow: hidden;
}
.right-ad{
  background-image: url('../../images/izquierda.avif'); /* Cambia a la ruta de tu imagen o GIF */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 50em; /* Altura fija */
  max-width: 100%; /* Asegura que no desborde horizontalmente */
  overflow: hidden;
}
.left-ad {
  background-image: url('../../images/izquierda.avif'); /* Cambia a la ruta de tu imagen o GIF */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 50em; /* Altura fija */
  max-width: 100%; /* Asegura que no desborde horizontalmente */
  overflow: hidden;
}

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
    background-image: url('../../images/abg.jpg');
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
/*     opacity: 0.2; */
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
    background-image: url('../../images/abg.png');
    background-size: 90%;
    background-position: center 50%; 
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
    border: 1px solid #374b40; /* Borde azul claro */
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
    background-color: #c5972d; /* Opcional, para que puedas ver el área de la imagen */
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
    .ph { top: 33%; left: 20%; }
    .paco2{ top: 33%; left: 47%; }
    .alb { top: 33%; left: 75%; }
    .na { top: 53%; right:75%; }
    .cl { top: 53%; Left: 40%;  }
    .hco3 { top: 53%; left: 70%;}
    .btn {
      top: 1%;
      left: 75%;
      background-color: #FFA500; /* Color naranja suave */
      border-radius: 20px; /* Redondeo de las esquinas */
      color: white; /* Color de texto blanco */
      padding: 10px 20px; /* Espaciado interno para hacer el botón más grande */
      border: none; /* Elimina el borde predeterminado */
      cursor: pointer; /* Cambia el cursor a mano al pasar sobre el botón */
      transition: background-color 0.3s ease; /* Transición suave en el cambio de color */
    }

  .btn:hover {
    background-color: #FF7F32; /* Un naranja más oscuro para el hover */
  }
    


  
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
  