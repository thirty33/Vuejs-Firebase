<template>
  <v-container>
    <v-layout row class="mb-3 text-xs-center">
      <v-flex>
        <h4 class="primary--text">IMPORTAR XLS/CSV:</h4>
      </v-flex>
    </v-layout>
    <v-layout row class="elevation-3">
      <v-flex>
        <div class="row-drag">
          <div class="col-md-12">
            <div id="drop" @drop.stop="handleDrop" @dragover.stop="handleDragover" @dragenter.stop="handleDragover">Coloque aqui archivo .CSV</div>
          </div>
        </div>
      </v-flex> 
    </v-layout>
    <v-layout row class="mt-3 text-xs-center">
      <v-flex>
       <send-data-dialog
        :ventas="tickets"
       ></send-data-dialog>
      </v-flex>
    </v-layout>
    <v-layout row class="mt-3 mb-2 text-xs-center">
      <v-flex>
        <h4 class="primary--text">APLICAR FILTROS:</h4>
      </v-flex>
    </v-layout>
    <v-layout row class="mb-3">
      <v-flex xs12 sm6>
        <v-card>
          <v-card-actions>
            <v-select label="validacion" :items="itemsValidate" v-model="validateValor"></v-select>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6>
        <v-card>
          <v-card-actions>
            <v-select label="ventas pagas" :items="itemsPaid" v-model="paidValor"></v-select>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6>
        <v-card>
          <v-card-actions>
            <v-select label="Correos qr" :items="itemsQr" v-model="busquedaQr"></v-select>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row>
      <tabla-data
      class="elevation-10" 
      :dataInit="ventas"></tabla-data> 
    </v-layout>
    <v-layout row class="mt-3 text-xs-center">
      <v-flex >
        <v-btn color="primary" dark @click="sendEmailsQr" v-show="userType === 'Asesor' || userType === 'SuperAdmin'">Enviar Correo Qr</v-btn>
        <v-btn color="primary" dark @click="enviarDataInicial">Cargar data inicial</v-btn>
      </v-flex>
      <v-flex>
        <v-btn color="primary" dark @click="validarSelect"  v-show="userType === 'SuperAdmin'">Validar ventas</v-btn>
        <v-btn color="primary" dark @click="pagarSelect" v-show="userType === 'Contable' || userType === 'SuperAdmin'">Pagar ventas</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row class="mt-1 text-xs-left">
      <v-flex xs12 offset-xs2>
        <download-excel
        class   = ""
        :data   = "ventas"
        :fields = "json_fields"
        name    = "datajetset.xls">
        <v-btn color="primary">Exportar Data</v-btn>
        </download-excel>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  import XLSX from 'xlsx'
  import Vue from 'vue'
  import EventBus from '../bus'
  var campos = {
    tickets:[{name:"test"}],
    headers:["Test header"],
  }
  /** HELPERS **/
  function get_header_row(sheet) {
      var headers = [], range = XLSX.utils.decode_range(sheet['!ref']);
      var C, R = range.s.r; /* start in the first row */
      for(C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
          var cell = sheet[XLSX.utils.encode_cell({c:C, r:R})] /* find the cell in the first row */
          var hdr = "UNKNOWN " + C; // <-- replace with your desired default 
          if(cell && cell.t) hdr = XLSX.utils.format_cell(cell);
          headers.push(hdr);
      }
      return headers;
  } 
  function fixdata(data) {
      var o = "", l = 0, w = 10240;
      for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
      o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
      return o;
  }
  // donde esta la vuelta o d
  function workbook_to_json(workbook) {
      var result = {};
      workbook.SheetNames.forEach(function(sheetName) {
          var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
          if(roa.length > 0){
              result[sheetName] = roa;
          }
      })
      return result;
  }
  /** PARSING and DRAGDROP **/
  function handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log("DROPPED");
    var files = e.dataTransfer.files, i, f;
    const _this = this
    for (i = 0, f = files[i]; i != files.length; ++i) {
        var reader = new FileReader(),
            name = f.name;
        reader.onload = function(e) {
        var results, 
            data = e.target.result, 
            fixedData = fixdata(data), 
            workbook=XLSX.read(btoa(fixedData), {type: 'base64'}), 
            firstSheetName = workbook.SheetNames[0], 
            worksheet = workbook.Sheets[firstSheetName];
        _this.headers=get_header_row(worksheet);
        results=XLSX.utils.sheet_to_json(worksheet);
        _this.tickets=results;
        };
        reader.readAsArrayBuffer(f);
   }
  }
  function handleDragover(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
  }
export default {
  created () {
    
  },
  mounted () {
    EventBus.$on('resetFields', () => {
      this.tickets = ''
      this.headers = ''
    }) 
  },
  data () {
    return {
      json_fields : {
        "marcaTemporal": "String",
        "nombreAsesor": "String",
        "primerNombre": "String",
        "segundoNombre": "String",
        "primerApellido": "String",
        "segundoApellido": "String",
        "documentId": "String",
        "tipoDeDocumento": "String", 
        "fechaNacimiento": "String", 
        "telefonoFijo": "String", 
        "telefonoCelular": "String", 
        "paisResidencia": "String", 
        "departamento": "String", 
        "ciudadResidencia": "String", 
        "dirResidencia": "String", 
        "email": "String", 
        "ciudadOrigen": "String", 
        "ciudadDestino": "String", 
        "idItem": "String",
        "planVacacional": "String",
        "fechaIda": "String", 
        "fechaRegreso": "String",
        "fechaActividad": "String",
        "precioNeto": "String",
        "precioVenta": "String",
        "numPasajerosAdultos": "String", 
        "numPasajerosNinos": "String", 
        "numInfantes": "String",
        "soporte1": "String",
        "numSoporte1": "String",
        "valorSoporte1": "String", 
        "soporte2": "String",
        "numSoporte2": "String", 
        "valorSoporte2": "String", 
        "soporte3": "String", 
        "numSoporte3": "String", 
        "valorSoporte3": "String", 
        "soporte4": "String",
        "numSoporte4": "String",
        "valorSoporte4": "String",
        "soporte5": "String",
        "numSoporte5": "String",
        "valorSoporte5": "String",
        "validate": "String",
        "paid": "String",
        "sendEmail": "String",
        "id": "String"
      },
      tickets: '',
      headers: '',
      busquedaQr: '',
      paidValor: '',
      validateValor: '',
      itemsValidate: [
        {text: 'Validadas', value: true},
        {text: 'No Validadas', value: false}
      ],
      itemsPaid: [
        {text: 'No pagadas', value: false},
        {text: 'Pagadas', value: true}
      ],
      itemsQr: [
        {text: 'No enviados', value: false},
        {text: 'Enviados', value: true}
      ],
      filterData: [],
      prueba: false
    }
  },
  methods: {
    handleDragover:handleDragover, 
    handleDrop:handleDrop,
    createDataBase () {
      this.$store.dispatch('createDataBase', this.tickets)
      EventBus.$emit('changeData', this.ventas)
    },
    loadDataBase () {
      this.$store.dispatch('loadDataBase')
    },
    sendEmailsQr () {
      this.$store.dispatch('sendEmailsQr')
    },
    validarSelect () {
      this.$store.dispatch('validarSelect')
      EventBus.$emit('changeData', this.ventas)
    },
    pagarSelect () {
      this.$store.dispatch('pagarSelect')
      EventBus.$emit('changeData', this.ventas)
    },
    busquedaValidados () {
      this.filterData = this.ventas.filter(venta => {
        return venta.validate == this.validateValor
      })
      EventBus.$emit('changeData', this.filterData)
    },
    busquedaPagados () {
      this.filterData = this.ventas.filter(venta => {
        return venta.paid == this.paidValor
      })
      EventBus.$emit('changeData', this.filterData)
    },
    busquedaPorCampoQr () {
      this.filterData = this.ventas.filter(venta => {
        return venta.sendEmail == this.busquedaQr
      })
      EventBus.$emit('changeData', this.filterData)
    },
    enviarDataInicial () {
      EventBus.$emit('changeData', this.ventas)
    },
    // export data
    exportData () {
      var data = {
        headers: this.headers,
        ventas: this.ventas
      }
      EventBus.$emit('valoresTabla', data)
    }

  },
  watch: {
    busquedaQr: function () {
      this.busquedaPorCampoQr()
    },
    paidValor: function () {
      this.busquedaPagados()
    },
    validateValor: function () {
      this.busquedaValidados()
    }
  },
  computed: {
    ticketsS () {
      return this.tickets
    },
    headersS() {
      return this.headers
    },
    ventas () {
      return this.$store.getters.cargarVentas
    },
    cabeceraMenu () {
      return this.$store.getters.cargarCabeceraMenu
    },
    userType () {
      if(this.$store.getters.user) {
        const user  = this.$store.getters.user
        return user.type
      }  
    }
  }
}
</script>

<style scoped>
  #drop {
    border: 2px dashed #bbb;
    /* -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px; */
    padding: 25px;
    text-align: center;
    font: 20pt bold,"Vollkorn";
    /* color: #bbb */
    color: #4286f4;
  }
</style>