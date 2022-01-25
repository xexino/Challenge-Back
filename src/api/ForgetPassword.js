const randomstring = require("randomstring");
const { db } = require("../config/mysql");
const { transport } = require("../mailer/mailer");

exports.forgetPw = (req, resp) => {
  const User = req.params.email;
  console.log(req.params.email);
  //validate username  let p    atternUsername = /^.{4,30}$/;
//   if (!patternUsername.test(User)) {
//     return resp
//       .status(402)
//       .json({ message: "username should be at least 4 characters maximum 12" });
//   }
  //verifier si username deja existe
  db.query(
    ` SELECT * FROM users
                 WHERE
                 email='${User}' `,
    (errr, resQ) => {
      if (errr) throw errr;
      else {
        console.log(resQ);
        if (resQ.length == 0)
          return resp.status(402).json({ message: "email not found " });
        else {
          if (resQ[0].isVerified == 0) {
            return resp
              .status(402)
              .json({ message: "please verify your account " });
          } else {
            //generate token
            const secretToken = randomstring.generate();
            db.query(
              ` UPDATE users SET expirationDate=NOW(), email_token='${secretToken}' WHERE email='${User}'`,
              (err, resQ1) => {
                if (err) throw err;
                else {
                  console.log(resQ1);

                  //send mail to newUser's email account
                  //mail options
                  const mailOptions = {
                    from: "maryam.bouderham@gmail.com",
                    to: User,
                    subject: "Please Verify your email Account",
                    html: `<a href="http://localhost:3000/resetPassword/${User}/code/${secretToken}">Click Here to reset your password</a>`,
                  };
                  transport.sendMail(mailOptions, (err1, info) => {
                    if (err1) throw err1;
                    else {
                      console.log(info);
                    }
                  });
                  return resp
                    .status(402)
                    .json({ message: "please verify your mail" });
                }
              }
            );
          }
        }
      }
    }
  );
};

