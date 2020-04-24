const nodemailer = require('nodemailer');
const {host, port, user, pass } = require('../config/mail.json');
const nodemailerhbs =require('nodemailer-express-handlebars');
const exphbs =require('express-handlebars');
const path = require('path');

var transport = nodemailer.createTransport({
    host: host,
    port: port,
    auth: { user, pass }
  });

  const viewPath = path.resolve('./src/resources/mail/auth');

  transport.use(
    'compile',
    nodemailerhbs({
      viewEngine: exphbs.create({
        layoutsDir: path.resolve(viewPath, 'layouts'),
        partialsDir: path.resolve(viewPath, 'partials'),
        defaultLayout: 'default',
        extname: '.html',
      }),
      viewPath,
      extName: '.html',
    })
  );

module.exports = transport;