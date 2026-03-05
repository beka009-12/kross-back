import { Router } from "express";
import * as userController from './auth.controllers'

const router = Router()

router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)

export default router