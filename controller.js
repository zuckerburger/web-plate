const {body, validationResult } = require("express-validator");

async function createUserPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).render('register.ejs', {errors: errors.array()});
  }
  res.render('register.ejs');
}

module.exports = {
  createUserPost
}