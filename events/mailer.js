/**
 * Created by rohit on 29/12/15.
 */

var emailer  = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config= require('config');
var events = require('../events');
var log = require('tracer').colorConsole(config.get('log'));
var mailer = config.get('mailer')

var defaultTransport = emailer.createTransport((smtpTransport({
    service: mailer.service,
    auth: {
        user:config.get('mailer.auth.user'),
        pass: config.get('mailer.auth.pass')
    }
})));

events.emitter.on("mail", function(data) {
    var from = "";
    var to = ""
    if (!data.to) {
        to = mailer.adminAddress;
    } else {
        to = data.to;
    }

    if (!data.from) {
        from = mailer.defaultFromAddress;
    } else {
        from = data.from;
    }

    defaultTransport.sendMail({
        from: from,
        to: to,
        subject: data.subject,
        text: data.text
    }, function(error, info) {
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    })
});