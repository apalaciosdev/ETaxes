const { Router } = require('express')
const { check } = require('express-validator')
const multer = require('multer');
const { saveFile } = require('../controllers/images')
const { validateFields } = require('../middlewares/validate-fields')
const router = Router();
const upload = multer({ dest: './' });


router.post('/upload', upload.single('file'), saveFile);


module.exports = router