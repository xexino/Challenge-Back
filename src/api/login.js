const { db } = require("../config/mysql");

exports.login = async (req, resp) => {
  //let credential = new credentials("maryam.bouderham@gmail.com", "aaddEE6789");

  // get email of the user from body:
  const User = req.body.email;
  const pass = req.body.password;
  console.log(req.body);

  //search user by username and password
  let query = `select * from users where email='${User}' and password=SHA1('${pass}')`;
  //apply query
  try {
    let res = await QR(query);
    console.log(res);
    if (res.length == 0) resp.status(402).json({ message: "Email not found " });
    else if (res[0]["isVerified"] == 1)
      resp.status(402).json({ message: "hello " + res[0]["FIRSTNAME"] });
    else resp.status(402).json({ message: "please verify your account " });
  } catch (error) {
    resp.status(500).json({ message: error.message });
  }
};
