const express = require('express');
// const ejs = require('ejs') --> Ejs por defecto con express
const path = require('path');
const multer = require('multer');
const uuid = require('uuid');

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
// Config Multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, './public/uploads'),
  filename: (req, file, callback, next) => {
    callback(null, uuid.v4() + path.extname(file.originalname).toLowerCase());
  },
});

// Middlewares multer use
app.use(
  multer({
    storage,
    dest: path.join(__dirname, './public/uploads'),
    limits: {fileSize: 1000000},
    fileFilter: (req, file, callback) => {
      const filetypes = /jpeg|jpg|png|gif/;
      const mimetype = filetypes.test(file.mimetype);
      const extensionName = filetypes.test(path.extname(file.originalname));
      if (mimetype && extensionName) {
        return callback(null, true);
      } else {
        callback('The file must be an image with the extension: jpeg | jpg | png | gif');
      }
    },
  }).single('image')
);

// Routes
app.use(require('./routes/routes'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(app.get('port'), () => {
  console.log(`Server on Port: http://127.0.0.1:${app.get('port')}`);
});
