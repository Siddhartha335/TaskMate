import { RequestHandler, Router } from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import { registerValidator, validateUser } from '../api/user/validators/userValidator.js';
import { isAdminRoute, protectedRoute } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', registerValidator, validateUser as RequestHandler, registerUser as RequestHandler); //validator

router.post('/login', loginUser as RequestHandler); //validator

// router.post('/logout', logoutUser);

export default router;
