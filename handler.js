const config = require("./knexfile");
const multer = require("multer");
const path = require("path");
const knex = require("knex");
const dbClient = knex(config);

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage }).single("itemImage");

const uploadImage = (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.json({ status: false, message: err.message });
    } else {
      res.json({ status: true, message: req.file.filename });
    }
  });
};

const addItem = (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const imageName = req.body.imageName;
  const desc = req.body.desc;

  dbClient("items")
    .insert({ name, price, imageName, desc })
    .then(() => res.json({ status: true, message: "Item added successfully." }))
    .catch(err => res.json({ status: false, message: err.message }));
};

const register = (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const password = req.body.password;

  dbClient("users")
    .insert({ firstName, lastName, username, password })
    .then(() =>
      res.json({ status: true, message: "User created successfully." })
    )
    .catch(err => res.json({ status: false, message: err.message }));
};

const login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  dbClient("users")
    .select()
    .where({ username, password })
    .then(() => res.json({ status: true, message: "Logged In." }))
    .catch(err => res.json({ status: false, message: err.message }));
};

const getAllItem = (req, res) => {
  dbClient("items")
    .select()
    .then(data => res.json({ status: true, message: "Data", data }))
    .catch(err => res.json({ status: false, message: err.message }));
};

module.exports = {
  register,
  login,
  addItem,
  uploadImage,
  getAllItem
};
