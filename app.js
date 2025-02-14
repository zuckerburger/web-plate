const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require("path");
const controller = require("./controller");

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, '/public')));

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');
// Routes
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));
app.get("/register", (req, res) => res.render('register'));
app.post("/register", controller.validateNewUser, controller.createUserPost);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
