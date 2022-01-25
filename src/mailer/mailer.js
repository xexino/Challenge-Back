const nodemailer= require('nodemailer')

exports.transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "10b130ba696a76",
      pass: "a1785b6311ba3b"
    }
  });
  