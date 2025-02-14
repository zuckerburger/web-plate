const {body, validationResult } = require("express-validator");
const db = require('./db/queries')
const alphError = "must only contain letters.";
const lengthError = (min, max) => { return `must be between ${min} and ${max} characters.` };

const validateNewUser = [
  body("first").trim().isAlpha().withMessage(`First name ${alphError}`)
  .isLength({min: 1, max: 15}).withMessage(`First name ${lengthError(1, 15)}`),

  body("last").trim().isAlpha().withMessage(`Last name ${alphError}`)
  .isLength({min: 1, max: 15}).withMessage(`Last name ${lengthError(1, 15)}`),
 
  body("password").trim().isLength({min: 3, max: 25}).withMessage(`Password ${lengthError(3, 25)}`),
 
  body("email").trim().isEmail().withMessage(`Email is incorrect format.`)
  .custom(async email => {
    const user = await db.findUserByEmail(email);
    if (user) throw new Error('Email already in use');
  }),
]

async function createUserPost(req, res) {
  const errors = validationResult(req);
  const {first, last, password, email } = req.body;
  if (!errors.isEmpty()) {
    return res.status(400).render('register', {errors: errors.array()});
  }
  await db.insertUser(first, last, email, password);
  res.render('register', {success: true});
};


module.exports = {
  createUserPost,
  validateNewUser
}