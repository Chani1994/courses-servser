const express = require('express');
const usersController = require('../controllers/users.controller');

const router = express.Router();

// קבלת כל המשתמשים
router.get('/', usersController.getAllUsers);

// קבלת משתמש לפי שם משתמש
router.get('/:name', usersController.getUserByName);

// הוספת משתמש חדש
router.post('/', usersController.createUser);

module.exports = router;

