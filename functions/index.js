const functions = require("firebase-functions");
const axios = require('axios');

// ************ Exported Cloud Functions on HTTP Triggers ************ //

//Test for calling a method exposed on the VPC Virtual Machine to send the OTP on a SMS sent through PCA.
exports.testSmppConnectionViaVM = functions.https.onRequest((req, res) => {
    try {
        let message = req.body.message;
        let phoneNumber = req.body.phoneNumber;

        // Enviar request al servicio expuesto en la Maquina Virtual para envio de mensaje SMS por PCA (SMPP)        
        axios.post('http://10.128.0.4:3030/sendSmsViaSmpp',{
            message: message,
            phoneNumber: phoneNumber
        }).then((response) => {
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);                
            res.status(200).send(response.data);
        }).catch(function (error) {           
            console.log(error); 
            res.status(403).json({
                status: error.message,
            });
        }) .then(function () {
            // always executed
        }); 
    }catch (error) {
        res.status(403).json({
            status: error.message,
        });
    }	
});
