require("dotenv").config();
// =======================REQUIRED===============================
const express = require("express");
const app = express();
const User = require("./models/user");
const Answer = require("./models/answer");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");
const nodemailer = require("nodemailer");
const path = require("path");

// ===================CONNECTING DATABASE========================
mongoose
  .connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo connection is done:)");
  })
  .catch((err) => {
    console.log("connection error!!!");
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "notagoodsecret" }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(function (req, res, next) {
  res.locals.username = req.session.username;
  next();
});

// ====================NODEMAILER===============================

app.post("/contact", function (req, res) {
  const message = req.body.message;
  const name = req.body.name;
  const email = req.body.email;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "quizland123@gmail.com",
      pass: "quizinferno",
    },
  });

  const options = {
    from: "quizland123@gmail.com",
    to: "quizland121@gmail.com",
    subject: name + " filled contact us form with email " + email,
    text: message,
  };

  transporter.sendMail(options, function (err, info) {
    if (err) console.log("ERROR!!", err);
    else console.log("Sent: " + info.response);
  });
});

// ====================USING MIDDLEWARE==========================
const requirelogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  }
  next();
};

// !!!!!!!!!!!!!!!!!!!!!!!ROUTES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.get("/", function (req, res) {
  res.render("landing");
});

// ===================CONTACT-US=================================
app.get("/contact", function (req, res) {
  res.render("contact");
});

// ===================ABOUT-US=================================
app.get("/about", function (req, res) {
  res.render("about");
});

// ===================QUIZ PAGES=================================
app.get("/sports", function (req, res) {
  res.render("sports");
});
app.get("/dsa", function (req, res) {
  res.render("dsa");
});
app.get("/gk", function (req, res) {
  res.render("gk");
});
app.get("/cultures", function (req, res) {
  res.render("cultures");
});

// ===================LEVEL-1=================================
app.get("/api1", function (req, res) {
  res.render("api1");
});
app.get("/api2", function (req, res) {
  res.render("api2");
});
app.get("/flag1", function (req, res) {
  res.render("flag1");
});
app.get("/manual1", function (req, res) {
  res.render("manual1");
});

// ===================LEVEL-2=================================
app.get("/levelapi1", requirelogin, (req, res) => {
  res.render("levelapi1");
});
app.get("/levelapi2", requirelogin, (req, res) => {
  res.render("levelapi2");
});
app.get("/flag2", requirelogin, (req, res) => {
  res.render("flag2");
});
app.get("/manual2", requirelogin, (req, res) => {
  res.render("manual2");
});
app.get("/dialogs", requirelogin, (req, res) => {
  res.render("dialogs");
});
app.get("/dialogc", requirelogin, (req, res) => {
  res.render("dialogc");
});
app.get("/dialogg", requirelogin, (req, res) => {
  res.render("dialogg");
});
app.get("/dialogd", requirelogin, (req, res) => {
  res.render("dialogd");
});

// ===================REGISTER=================================
app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { password, username } = req.body;
  const hash_pw = await bcrypt.hash(password, 12);
  const user = new User({
    username,
    password: hash_pw,
  });
  await user.save();
  req.session.user_id = user._id;
  res.redirect("/");
});

// ===================ANSWER BOOKLET===========================
app.get("/takeAnswers", (req, res) => {
  res.render("takeAnswers");
});
app.post("/takeAnswers", async (req, res) => {
  const {
    number,
    answer1,
    answer2,
    answer3,
    answer4,
    answer5,
    answer6,
    answer7,
    answer8,
    answer9,
    answer10,
  } = req.body;
  const ans = new Answer({
    number,
    answer1,
    answer2,
    answer3,
    answer4,
    answer5,
    answer6,
    answer7,
    answer8,
    answer9,
    answer10,
  });
  await ans.save();
  res.redirect("/");
});
app.get("/download", async (req, res) => {
  const number = 1;
  const ans = await Answer.findOne({ number });
  // res.send(ans);
  res.render("download", { ans });
});

app.get("/solution", (req, res) => {
  res.render("solution");
});

// ===================LOGIN=================================
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  let currentuser = user.username;
  console.log(currentuser);
  // res.send(currentuser);
  const validpassword = await bcrypt.compare(password, user.password);
  if (validpassword) {
    req.session.user_id = user._id;
    req.session.username = user.username;
    // res.redirect('/')
    res.render("landing", { username: user.username });
  } else {
    alert("Wrong Crediential");
  }
});

// ===================LOGOUT=================================
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
// =======================Listening App===========================
app.listen(process.env.PORT || 2000, function () {
  console.log("listening on port 2000!!");
});
