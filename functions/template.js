const css = require('yo-css')
const yo = require('yo-yo')

module.exports = function emailTemplate(vars) {
    return yo `<div>
    <img src="http://photos.jetsetviajesyturismo.com/i.ashx?&mid=102592370&mt=Photo&standardsize=256x93" alt="jet-set-logo" />
    <h1>Bienvenido ${vars.primerNombre} ${vars.segundoNombre} ${vars.primerApellido} ${vars.segundoApellido} </h1>
    <h3>Detalle de la venta:</h3>
    <h4>Id cliente: ${vars.documentId}</h4>
    <h4>Plan vacacional: ${vars.planVacacional}</h4>
    <h4>Num. Pasajeros Adultos: ${vars.numPasajerosAdultos}</h4>
    <h4>Num. Infantes: ${vars.numPasajerosNinos}</h4>
    <h3>Codigo Qr:</h3>
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${vars.numSoporte1}" alt="qr-code" />
  </div>`
}