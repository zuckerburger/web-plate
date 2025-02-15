const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require("path");
const controller = require("./controller");
const passport = require('./passport');
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({ 
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false 
}));
app.use(passport.session());

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');
// Routes
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));
app.get("/register", (req, res) => res.render('register'));
app.post("/register", controller.validateNewUser, controller.createUserPost);
app.get("/login/:status?", (req, res) => { 
  console.log(JSON.stringify(req.session));
  console.log(JSON.stringify(req.user));
  console.log('messages ', JSON.stringify(req.session.message));
  res.render('login', {error: req.params.status});
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login/error"
  }),
);

app.get('/dashboard', (req, res) => {
  res.render('dashboard', {user: req.user});
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
