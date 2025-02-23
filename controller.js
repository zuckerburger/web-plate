const {body, validationResult } = require("express-validator");
const db = require('./db/queries');
const { escapeIdentifier } = require("pg");
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
const validateNewItem = [
  body("name").isLength({min: 1, max: 30}).withMessage(`Item name ${lengthError(1,30)}`)
  .custom(async (name, {req}) => {
    const id = req.user?.id;
    if (!req.user) {
      throw new Error("Invalid user session, please login again.")
    }
    const item = await db.findItemByName(name, id);
    if (item) throw new Error('Item name already in use');
  })
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

async function createItemPost(req, res) {
  const errors = validationResult(req);
  const {name, price, imageurl} = req.body;
  if (errors.isEmpty()) {
    await db.insertItem(req.user.id, name, price, imageurl);
  } else {
    console.log(errors);
  }
  res.redirect('/user/edit');
}
async function editMenuGet(req, res) {
  const items = await db.selectItemsFromUser(req.user.id);
  console.log('Menu is ' + JSON.stringify(items));
  res.locals.menu = items;
  res.render('edit');
}
module.exports = {
  createUserPost,
  validateNewUser,
  createItemPost,
  validateNewItem,
  editMenuGet

}