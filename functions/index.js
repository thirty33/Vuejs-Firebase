var functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)
var emailTemplate = require('./template')
const nodemailer = require('nodemailer')
var sgTransport = require('nodemailer-sendgrid-transport')

var options = {
  service: 'SendGrid',
  auth: {
    api_user: '######',
    api_key: '######'
  }
}

var client = nodemailer.createTransport(sgTransport(options))


exports.sendEmailQr = functions.database.ref('/ventas/{key}').onUpdate(event => {
  var key = event.params.key
  var eventSnapshot = event.data;
  var sendEmail = eventSnapshot.child('sendEmail')
  if (sendEmail.changed()) {
    const email = eventSnapshot.child('email').val()
    const numSoporte1 = eventSnapshot.child('numSoporte1').val()
    const primerNombre = eventSnapshot.child('primerNombre').val()
    const primerApellido = eventSnapshot.child('primerApellido').val()
    const segundoNombre = eventSnapshot.child('segundoNombre').val()
    const segundoApellido = eventSnapshot.child('segundoApellido').val()
    const planVacacional = eventSnapshot.child('planVacacional').val()
    const documentId = eventSnapshot.child('documentId').val()
    const numPasajerosAdultos = eventSnapshot.child('numPasajerosAdultos').val()
    const numPasajerosNinos = eventSnapshot.child('numPasajerosNinos').val()
    
    const template = `<body style="Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;background-color:#FBD600;" >
    <table width="100%" border="0" cellspacing="0" cellpadding="0" align="left" style="border-spacing:0;font-family:sans-serif, 'Roboto';" >
    <!-- START SEPARATOR -->
      <tr>
        <td id="separator-1" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;font-size:5px;color:#FBD600;line-height:15px;mso-line-height-rule:exactly;background-color:#FBD600;" >-</td>
      </tr>
    <!-- END SEPARATOR -->
    <!-- START ARTICLE 3 -->  
    <tr>
        <td class="one-column-article-back" align="center" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;background-color:#FBD600;" >
        <center class="wrapper" style="width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;" >
            <div class="webkit" style="max-width:600px;" >

            <!--[if (gte mso 9)|(IE)]>
            <table width="600" align="center" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;font-family:sans-serif, 'Roboto';" >
            <tr>
            <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
            <![endif]-->

            <table class="outer" align="center" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;font-family:sans-serif, 'Roboto';Margin:0 auto;width:100%;max-width:600px;" >
                <tr>
                <td class="one-column-article padding-topbottom-10" style="color:black;padding-top:10px;padding-bottom:10px;padding-right:0;padding-left:0;background-color:#ffffff;" >
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;font-family:sans-serif, 'arial';" >
                    <tr>
                        <td class="padding-20 contents" style="width:100%;padding-top:20px;padding-bottom:20px;padding-right:20px;padding-left:20px;text-align:center;" >
                            <h1 style="font-size:16px;">Bienvenido ${primerNombre} ${segundoNombre} ${primerApellido} ${segundoApellido}  </h1>
                            <h3 style="font-size:16px;">Detalle de la venta:</h3>
                            <h4 style="font-size:16px;">Id cliente: ${documentId}</h4>
                            <h4 style="font-size:16px;">Plan vacacional: ${planVacacional}</h4>
                            <h4 style="font-size:16px;">Num. Pasajeros Adultos: ${numPasajerosAdultos} 60</h4>
                            <h4 style="font-size:16px;">Num. Infantes: ${numPasajerosNinos}</h4>
                            <h3 style="font-size:16px;">Codigo Qr:</h3>
                            <img style="margin:auto;padding-top: 15px;" width="200" src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${numSoporte1}" alt="qr-code" />
                            <h5>Gracias por comprar con JetSet</h2>
                        </td>
                    </tr>
                    </table>
                </td>
                </tr>
            </table>

            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->

            </div>
        </center>
        </td>
    </tr>
    <!-- END ARTICLE 3 -->
    <!-- START SEPARATOR pequeno-->
    <tr>
        <td align="center" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0; background-color: #FBD600;" >
        <center class="wrapper" style="width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;" >
            <div class="webkit" style="max-width:600px;" >

            <!--[if (gte mso 9)|(IE)]>
            <table width="600" align="center" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;font-family:sans-serif, 'Roboto';" >
            <tr>
            <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
            <![endif]-->

            <table class="outer" align="center" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;font-family:sans-serif, 'Roboto';Margin:0 auto;width:100%;max-width:600px;" >
                <tr>
                <td class="one-column padding-topbottom-10" style="padding-top:0px;padding-bottom:0px;padding-right:0;padding-left:0; background-color: #ffffff;" >
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;font-family:sans-serif, 'Roboto';" >
                    <tr>
                        <td class="contents padding-rightleft-20" style="width:100%;padding-top:0px;padding-bottom:0;padding-right:20px;padding-left:20px;text-align:left;" >
                        <table border="0" cellspacing="0" cellpadding="0" align="center"  width="100%" style="margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto;border-spacing:0;font-family:sans-serif, 'Roboto';" >
                            <tr>
                            <td class="article-separator" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;font-size:4px;color:#ffffff;mso-line-height-rule:exactly;line-height:4px;border-bottom-width:4px;border-bottom-style:solid;border-bottom-color:#cccccc;" >-</td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                    </table>
                </td>
                </tr>
            </table>

            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->

            </div>
        </center>
        </td>
    </tr>
    <!-- END SEPARATOR -->
    <!-- logos footer -->
    <tr>
        <td class="article-back" align="center" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;background-color:#FBD600;" >
        <center class="wrapper" style="width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;" >
            <div class="webkit" style="max-width:600px;" >

            <!--[if (gte mso 9)|(IE)]>
            <table width="600" align="center" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;font-family:sans-serif, 'Roboto';" >
            <tr>
            <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
            <![endif]-->

            <table class="outer" align="center" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;font-family:sans-serif, 'Roboto';Margin:0 auto;width:100%;max-width:600px;" >
                <tr>
                <td class="two-column padding-topbottom-10" style="padding-top:20px;padding-bottom:20px;padding-right:0;padding-left:0;text-align:center;font-size:0; background-color: #ffffff" >

                    <!--[if (gte mso 9)|(IE)]>
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;font-family:sans-serif, 'Roboto';" >
                    <tr>
                    <td width="50%" valign="top" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
                    <![endif]-->

                    <div class="column" style="width:100%;max-width:300px;display:inline-block;vertical-align:top;" >
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;font-family:sans-serif, 'Roboto';" >
                        <tr>
                        <td class="padding-20" style="padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;" >
                            <table class="contents" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;font-family:sans-serif, 'Roboto';width:100%;font-size:14px;text-align:left">
                            <tr>
                                <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" align="center" >
                                </td>
                            </tr>
                            
                            </table>
                        </td>
                        </tr>
                    </table>
                    </div>

                    <!--[if (gte mso 9)|(IE)]>
                    </td><td width="50%" valign="top" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
                    <![endif]-->

                    <div class="column" style="width:100%;max-width:300px;display:inline-block;vertical-align:top;" >
                    <table width="100%" height="102" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;font-family:sans-serif, 'Roboto';" >
                        <tr align="center">
                        <td align="center"  style="border:0 0;font-family: arial; font-size:15px; color:#0d133d; line-height:20px;text-align: center;padding-bottom: 10px;padding-top: 10px;"><b>Conectate con nosotros:</b><br> 
                        </tr>
                        <tr align="center">

                        <td class="padding-20" style="padding-top:5px;padding-bottom:0px;padding-right:0px;padding-left:0px;text-align: center;" >
                            <table border="0" cellpadding="0" cellspacing="0" align="center">
                            <tr align="center">
                                
                            </tr>
                            </table>
            
                        </td>
                        </tr>
                    </table>
                    </div>

                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->

                </td>
                </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->

            </div>
        </center>
        </td>
    </tr>
    <!--/logos footer -->

    <!-- START SEPARATOR grande -->
    <tr>
        <td id="separator-3" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;font-size:5px;color:#ffffff;line-height:5px;mso-line-height-rule:exactly;background-color:#FBD600;" >-</td>
    </tr>
    <!-- END SEPARATOR -->
    <!-- START ARTICLE final -->
    <tr>
        <td id="subhead-region-back" align="center" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;background-color:#FBD600;" >
        <center class="wrapper" style="width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;" >
            <div class="webkit" style="max-width:600px;" >

            <!--[if (gte mso 9)|(IE)]>
            <table width="600" align="center" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;font-family:sans-serif, 'Roboto';" >
            <tr>
            <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
            <![endif]-->

            <table class="outer" align="center" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;font-family:sans-serif, 'Roboto';Margin:0 auto;width:100%;max-width:600px;" >
                <tr>
                <td class="one-column padding-topbottom-10" style="padding-top:0px;padding-bottom:10px;padding-right:0;padding-left:0;" >
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;font-family:sans-serif, 'Roboto';" >
                    <tr>
                        <td class="padding-20 contents" style="width:100%;padding-top:0px;padding-bottom:20px;padding-right:20px;padding-left:20px;text-align:center;" >
                        
                        <p style="Margin:0;font-size:14px;line-height:18px;Margin-top:5px;color:#546e7a;" >Jet Set rechaza la explotación, la pornografía, el turismo sexual y demás formas de abuso sexual con menores, Ley 679 de 2001. Jet Set cumple la Ley 17 de 1981 y Resolución 1367 de 2000 contra la comercialización y tráfico de especies de fauna y flora silvestre. Jet Set rechaza la discriminación o actos de racismo a la población vulnerable. Ley 1752 de 2015 y ley 1482 de 2011.</p>
                        
                        </td>
                    </tr>
                    </table>
                </td>
                </tr>
            </table>

            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
          </div>
        </center>
        </td>
    </tr>
    <!-- END ARTICLE final -->
    </table>
  </body>`          


    let options = {
      from: 'ventas@ventas.info',
      to: `${email}`,
      subject: `Detalle de Venta ${numSoporte1}`,
    //   text: 'Hello world',
      html: template
    }

    client.sendMail(options, function(err, info){
      if (err ){
        console.log(error)
      }
      else {
        console.log('Message sent: ' + info)
      }
    })
  }  
})

exports.createUser = functions.database.ref('/users/{uid}').onCreate(event => {

  var eventSnapshot = event.data;
  var email = eventSnapshot.child('email').val()
  var name = eventSnapshot.child('name').val()
  var password = eventSnapshot.child('password').val()
  
  admin.auth().createUser({
    uid: event.params.uid,
    email: email,
    emailVerified: false,
    password: password,
    disabled: false
  })
    .then(function(userRecord) {
      
      console.log("Successfully created new user:", userRecord.uid);
    })
    .catch(function(error) {
      console.log("Error creating new user:", error)
    })

})

exports.updateUser = functions.database.ref('/users/{uid}').onUpdate(event => {
  var eventSnapshot = event.data;
  var password = eventSnapshot.child('password')
  if (password.changed()) {
    admin.auth().updateUser(event.params.uid, {
      password: password.val(),
    })
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord
      console.log("Successfully updated user", userRecord.toJSON()) 
    })
    .catch(function(error) {
      console.log("Error updating user:", error)
    })
  }
})

exports.deleteUser = functions.database.ref('/users/{uid}').onDelete(event => {
  admin.auth().deleteUser(event.params.uid)
  .then(function() {
    console.log("Successfully deleted user")
  })
  .catch(function(error) {
    console.log("Error deleting user:", error)
  })
})