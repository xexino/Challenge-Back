const { db } = require("../config/mysql");
const { verifyDate } = require("../helpers/verifyDate");

exports.reset = (req, resp) => {
  //     resp.send("aaaaaaa")
  //    // let newPassword = new PasswordModel("aaddEE6789", "aaddEE6789");
  //    password=req.body.Password

  let newPassword = "Pass135638";
  // compare password
  // if (password.localeCompare(newPassword) == 0) {
  //   // validate password
  //   const patternPassword =
  //     /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,12}$/;

  //   if (!patternPassword.test(password)) {
  //     return resp.status(404).json(
  //      {message:"Password Should be at least 8 characters & maximum 12 and contains at least one number one uppercase and lowercase😅 !!"}
  //     );

  //   }
  // } else {
  //   return resp.status(404).json(
  //     {message:"les mots de passe ne sont pas identiques"});

  // }

  //query by username and token

  console.log(req.params.email);
  db.query(
    ` SELECT * FROM users WHERE email='${req.params.email}' AND email_token = '${req.params.email_token}'`,
    (errr, resQ) => {
      if (errr) throw errr;
      else {
        console.log(resQ);
        if (resQ.length === 0)
          return resp.status(404).json({ message: "<h1>Invalid Token !!" });
        else {
          console.log(resQ[0]);
          if (!verifyDate(resQ[0].expirationDate))
            return resp.status(404).json({ message: "<h1> Invalid Token !!" });
          else {
            db.query(
              ` UPDATE users SET password=SHA1('${newPassword}'),email_token ="" WHERE email='${req.params.email}' `,
              (err, resQ1) => {
                if (err) throw err;
                else {
                  console.log(resQ1);
                  return resp
                    .status(404)
                    .json({ message: "<h1>mot de passe modifié !!" });
                }
              }
            );
          }
        }
      }
    }
  );
};
