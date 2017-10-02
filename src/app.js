//User service

//Imports
const grpc = require('grpc');
const emailhelper = require('./helpers/email.helper.js');
const proto = grpc.load(__dirname + '/proto/email.proto');
const server = new grpc.Server();

//define the callable methods that correspond to the methods defined in the protofile
server.addService(proto.email.EmailService.service, {
  send: function(call, callback){
    emailHelper.send(call, callback);
  }
});

//Specify the IP and and port to start the grpc Server, no SSL in test environment
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());

//Start the server
server.start();
console.log('gRPC server running on port: 50051');
