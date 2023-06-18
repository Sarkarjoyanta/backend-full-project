const express = require('express');
const registrationController = require('../../controllers/registrationController.js');
const loginController = require('../../controllers/loginController.js');
const otpmatchController = require('../../controllers/otpmatchController.js');
const router = express.Router()

router.post('/registration', registrationController)
router.post('/login', loginController)
router.post('/otpmatch', otpmatchController)

module.exports = router;