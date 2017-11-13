var google = require('googleapis');
var gmail = google.gmail('v1');
var key = require('../data/client_secret.json');
var oAuthClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/gmail.send'],
    null
);

var message = new Buffer(
    "Content-Type: text/plain; charset=\"UTF-8\"\n" +
    "MIME-Version: 1.0\n" +
    "Content-Transfer-Encoding: 7bit\n" +
    "To: mwild95@live.co.uk\n" +
    "From: <some email>\n" +
    "Subject: something something lol\n\n" +
    "heyheyhey"
).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');

gmail.users.messages.send({
    auth: oAuthClient,
    userId: 'noreply@wildapplications.com',
    resource: {
        raw: message
    }
}, function(err, resp) {
    console.log('err', err);
    console.log('resp', resp);
});
