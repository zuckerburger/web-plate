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
app.get("/login", (req, res) => { 
  res.render('login', {error: req.session.error});
});

app.post(
  "/login",
  passport.authenticate("local", (err, user, info) => {
    if (err || !user) {
      req.session.error = true;
      return res.redirect('/login');
    }
    return res.redirect('/dashboard');
  }),
);

app.get('/dashboard', (req, res) => {
  res.render('dashboard', {user: req.user});
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
