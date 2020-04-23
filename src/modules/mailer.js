const nodemailer = require('nodemailer');
const {host, port, user, pass } = require('../config/mail.json');
const hbs = require('nodemailer-express-handlebars');
const path = require('path')

var transport = nodemailer.createTransport({
    host: host,
    port: port,
    auth: { user, pass }
  });

  transport.use('compile', hbs({
      viewEngine: 'handlebars',
    //   partialsDir: path.resolve('./src/resources/mail/'),
      viewPath: path.resolve('./src/resources/mail/'),
      extName: '.html'
  }))

  module.exports = transport;