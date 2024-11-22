import { RequestHandler, Router } from 'express';
import { registerUser, loginUser,logoutUser,getTeamList, getNotificationList, updateUserProfile, markNotificationAsRead, changeUserPassword, activateUserProfile, deleteUserProfile } from '../controllers/userController.js';
import { registerValidator, validateUser } from '../api/user/validators/userValidator.js';
import { isAdminRoute, protectedRoute } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', registerValidator, validateUser as RequestHandler, registerUser as RequestHandler); //validator
router.post('/login', loginUser as RequestHandler); //validator
router.post('/logout', logoutUser);

router.get('/team', protectedRoute as RequestHandler, isAdminRoute as RequestHandler, getTeamList);
router.get("/notifications", protectedRoute as RequestHandler, getNotificationList);

router.put("/profile", protectedRoute as RequestHandler,updateUserProfile);
router.put("/read-notification", protectedRoute as RequestHandler,markNotificationAsRead);
router.put("/change-password", protectedRoute as RequestHandler,changeUserPassword);

//Admin Routes
router
    .route("/:id")
    .put(protectedRoute as RequestHandler, isAdminRoute as RequestHandler, activateUserProfile )
    .delete(protectedRoute as RequestHandler, isAdminRoute as RequestHandler, deleteUserProfile);

export default router;
