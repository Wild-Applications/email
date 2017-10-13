var jwt = require('jsonwebtoken'),
nodemailer = require('nodemailer'),
transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    XOAuth2: {
        user: "michael@wildapplications.com",
        clientId: "953798993030-12aaeh3m9utpt90pgmmisus1c3ngjg8m.apps.googleusercontent.com",
        clientSecret: "YmufwTFNbsUt3dUWX9QVVeVu",
        refreshToken: "1/6GMTqY3Nu1mVgeZwswa_5KBPout6wFENmlFhSZRmm5t2W1j2Nm-1Wfv-SG3p0abT",
        timeout: 3600
    }
  }
});

var emailer = {};

emailer.send = function(call, callback){
  console.log('Send request received');
  var options = {
    to: call.request.recipient,
    subject: call.request.subject,
    text: call.request.content
  };
  transporter.sendMail(options, function(error, response){
    if(error){
      return callback({message: JSON.stringify(error)}, null);
    }
    callback(null, {result: true});
  });
}

module.exports = emailer;
