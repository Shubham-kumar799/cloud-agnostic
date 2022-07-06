const express = require('express');

//controllers
const { createUser } = require('../controllers/auth');

const router = express.Router();

router.post('/create-user', createUser);

module.exports = router;
