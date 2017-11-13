var google = require('googleapis');
var gmail = google.gmail('v1');
var key = require('../data/client_secret.json');
var authenticatedEmail = "cloud@wildapplications.com"
var oAuthClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/gmail.send'],
    authenticatedEmail
);
//authenticate with the service account we created earlier

var emailer = {};

emailer.send = function(call, callback){
  sendEmail(call, callback);
}

function sendEmail(call, callback){
  var message = "";
  message += "Content-Type: text/plain; charset=\"UTF-8\"\n";
  message += "MIME-Version: 1.0\n";
  message += "Content-Transfer-Encoding: 7bit\n";
  message += "To: " + call.request.recipient + "\n";
  message += "From: Tab App <"+authenticatedEmail+">\n";
  message += "Subject: " + call.request.subject + "\n\n";
  message += call.request.content;

  var bufferedMessage = new Buffer(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');

  gmail.users.messages.send({
    auth: oAuthClient,
    userId: 'me',
    resource: {
      raw: message
    }
  }, function(err, response){
    if(err){
      callback({message:JSON.stringify(err)}, null);
    }else{
      callback(null, {result: true})
    }
  });
}




//code for debugging
/*
var message = new Buffer(
    "Content-Type: text/plain; charset=\"UTF-8\"\n" +
    "MIME-Version: 1.0\n" +
    "Content-Transfer-Encoding: 7bit\n" +
    "To: michael@tabapp.co.uk\n" +
    "From: Tab App <"+ authenticatedEmail +">\n" +
    "Subject: Testing From Name\n\n" +
    "heyheyhey"
).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');

gmail.users.messages.send({
    auth: oAuthClient,
    userId: 'me',
    resource: {
        raw: message
    }
}, function(err, resp) {
    console.log('err', err);
    console.log('resp', resp);
});
*/
