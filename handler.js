'use strict';

var aws = require('aws-sdk');
var current_week = require('current-week-number');

aws.config.update({region:'us-east-1'});

function sendNotification(){
  
  var params = {
    Message: 'Esta semana toca poner '+current_week()+' soles en la alcancia :)',
    TopicArn: 'arn:aws:sns:us-east-1:530088275162:moneybox'
  }

  var publishText = new aws.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

  publishText.then(
    function(data){
      console.log('Message send');
      console.log("MessageID is "+data.MessageId);
    }).catch(
      function(err){
        console.error(err, err.stack);
      }
    );
}
module.exports.notify = event => {
  return sendNotification(event);
};
