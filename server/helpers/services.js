const nodemailer = require("nodemailer"),
      {errorHandler} = require("./error"),
      {EMAIL_HOST, EMAIL_RECEIVER, EMAIL_PASSWORD} = process.env,
      transporter = nodemailer.createTransport({
         host: "Smtp.live.com",
         service: "Outlook",
         port: 587,
         secure: false,
         tls: {
            rejectUnauthorized: false
         },
         auth: {
            user: EMAIL_HOST,
            pass: EMAIL_PASSWORD
         }
      });

exports.sendMessage = (req, res, next) => {
   const {message: mailMessage} = req.body,
         mailOptions = {
            from: `"TodoDesktop👻" ${EMAIL_HOST}`,
            to: EMAIL_RECEIVER,
            subject: `Todo Desktop Bug Report, User: ${req.user.username}`,
            text: mailMessage
         };

   if(!mailMessage) return next(errorHandler(409, "A message body is required to proceed"));

   transporter.sendMail(mailOptions)
      .then(mail => res.status(200).json({message: "Message sent successfully"}))
      .catch(error =>  {
         console.log(error);
         return next(errorHandler(500, "Failed to send the message"));
      });
};

module.exports = exports;