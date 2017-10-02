var jwt = require('jsonwebtoken'),
nodemailer = require('nodemailer'),
transporter = nodemailer.createTransport('smtps://cloud@wildapplications.com%40gmail.200717GRAD$@smtp.gmail.com');

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
