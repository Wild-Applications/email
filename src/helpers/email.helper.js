var jwt = require('jsonwebtoken'),
nodemailer = require('nodemailer'),
transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'cloud@wildapplications.com',
    pass: '200717GRAD'
  }
});

var emailer = {};

emailer.send = function(call, callback){
  jwt.verify(call.metadata.get('authorization')[0], process.env.JWT_SECRET, function(err, token){
    if(err){
      return callback({message:err},null);
    }
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
  });
}

module.exports = emailer;
