const express = require("express");
const { API_URL } = require("./config/api");
const { db } = require("./config/mysql");
const { login } = require("./api/login");
const { forgetPw } = require("./api/ForgetPassword");
const { reset } = require("./api/ResetPassword");
require("dotenv").config();
const { checkout } = require("./api/Payement");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");
const bp = require("body-parser");
const cors = require("cors");

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//Connect
db.connect((err) => {
  if (err) throw err;
  console.log("Mysql connected...");
});


//body could have diff types
app.use(bp.urlencoded({ extended: true }));
//looks at requests where the Content-Type: application/json (Header)
app.use(bp.json());
//appliquer le cors comme middle ware
app.use(cors());

app.listen("9000", () => {
  console.log("Server started on port 9000 😇");
});

// //register
// app.post(`/${API_URL.auth}/register`, register)

// //verify email after register
// app.post(`/${API_URL.auth}/verify-email`, verifyEmail)

// login
app.get(`/${API_URL.user}/login`, login);

//forgot pass
// app.post(`${API_URL.auth}/Forgot-Password/:email`, forgetPw)
app.get(`/${API_URL.user}/Forgot-Password/:email`, forgetPw);

// reset pass
app.get(`/${API_URL.auth}/Reset-Password/:email/code/:email_token`, reset);

// payment par carte  --using stripe--
app.post("/api/users/checkout", checkout);
