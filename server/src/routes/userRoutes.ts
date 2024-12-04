import { RequestHandler, Router } from 'express';
import { registerUser, loginUser,logoutUser,getTeamList, getNotificationList, updateUserProfile, markNotificationAsRead, changeUserPassword, activateUserProfile, deleteUserProfile } from '../controllers/userController.js';
import { registerValidator, validateUser } from '../api/user/validators/userValidator.js';
import { isAdminRoute, protectedRoute } from '../middlewares/authMiddleware.js';
import passport from 'passport';
import "../api/user/strategies/githubStrategy.js";
import "../api/user/strategies/googleStrategy.js";
import { createJWT } from '../api/user/utils/jwtUtils.js';

const router = Router();

router.post('/register', registerValidator, validateUser as RequestHandler, registerUser as RequestHandler); //validator
router.post('/login', loginUser as RequestHandler); //validator
router.post('/logout', logoutUser);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/redirect", passport.authenticate("google", { failureRedirect: "/login", session: false }), (req: any, res: any) => {
  const user = req.user;
  if (user) {
    createJWT(res, user.id);
    user.password = undefined as any;
    // res.status(200).json(user);
    const frontend_url = `${process.env.FRONTEND_URL}/login/success?user=${encodeURIComponent(JSON.stringify(user))}`;
    res.redirect(frontend_url)
  } else {
    return res.status(400).json({ status: false, message: "Invalid credentials" });
  }
});

router.get("/github", passport.authenticate("github"));
router.get("/github/redirect",passport.authenticate("github", { failureRedirect: "/login", session: false }), (req: any, res: any) => {
    const user = req.user;
    if (user) {
      if (user) {
        createJWT(res, user.id);
        user.password = undefined as any;
        // res.status(200).json(user);
        const frontend_url = `${process.env.FRONTEND_URL}/login/success?user=${encodeURIComponent(JSON.stringify(user))}`;
        res.redirect(frontend_url)
      }
      } else {
        return res.status(400).json({ status: false, message: "Invalid credentials" });
      }
});

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
