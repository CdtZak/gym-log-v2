const express = require('express')
const userController = require('./../controllers/userController')


//ROUTES
const router = express.Router()
router.post('/signUp',userController.signUp)
router.post('/login',userController.login)
router.get('/:id',userController.getUser)
router.patch('/:id',userController.updateUser)
module.exports=router