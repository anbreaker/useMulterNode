const {Router} = require('express');
const router = Router();
const path = require('path');

// Routes
router.get('/', (req, res) => {
  res.render('index');
});

router.post('/upload', (req, res) => {
  // console.log(req.file);
  res.send('upload');
});

module.exports = router;
