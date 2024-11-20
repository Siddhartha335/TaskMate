import { RequestHandler, Router } from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import { registerValidator, validateUser } from '../api/user/validators/userValidator.js';

const router = Router();

router.post('/register', registerValidator, validateUser as RequestHandler, registerUser);

router.post('/login', loginUser);

export default router;
