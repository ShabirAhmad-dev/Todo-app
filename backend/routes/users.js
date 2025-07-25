
import express from 'express';
import {Registration, getUsers, Login, LogOut} from '../controllers/users_controller.js';
import { validateCreatePerson, ValidateOnlyPassword } from '../services/users_validation.js';
import { checkSchema } from 'express-validator';
import { isloggedIn } from '../middlewares/verifyToken.js';
import { changePassword, userProfile, userProfileBio } from '../controllers/user_profile.js';
import isAuthenticated from '../middlewares/users_auth.js';




const router = express.Router()

router.route('/register').post(checkSchema(validateCreatePerson),Registration);
router.route('/users').get(getUsers);
router.route('/login').post(Login)

// LOGOUT
router.route('/logout').get(LogOut)

//auth
router.route('/isloggedIn').get(isloggedIn)

// User profile route goes here
router.route('/profile').get(isAuthenticated, userProfile)
router.route('/profile/bio').patch(isAuthenticated, userProfileBio)

//change password route
router.route('/changePassword').post(checkSchema(ValidateOnlyPassword), isAuthenticated, changePassword)

export default router
