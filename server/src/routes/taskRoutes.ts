import { RequestHandler, Router } from 'express';
import { isAdminRoute, protectedRoute } from '../middlewares/authMiddleware.js';
import { createSubTask, createTask, dashboardStatistics, deleteRestoreTask, duplicateTask, getTask, getTasks, postTaskActivity, trashTask, updateTask } from '../controllers/taskController.js';
import { taskValidator, validateTask } from '../api/task/validators/taskValidator.js';

const router = Router();

router.post("/create",protectedRoute as RequestHandler,isAdminRoute as RequestHandler, taskValidator,validateTask as RequestHandler,createTask);
router.post("/duplicate/:id",protectedRoute as RequestHandler,isAdminRoute as RequestHandler,duplicateTask);
router.post("/activity/:id",protectedRoute as RequestHandler,postTaskActivity);

router.get("/dashboard",protectedRoute as RequestHandler,dashboardStatistics)
router.get("/",protectedRoute as RequestHandler,getTasks)
router.get("/:id",protectedRoute as RequestHandler,getTask)

router.put("/create-subtask/:id", protectedRoute as RequestHandler, isAdminRoute as RequestHandler, createSubTask);
router.put("/update/:id",protectedRoute as RequestHandler,isAdminRoute as RequestHandler, updateTask);
router.put("/:id",protectedRoute as RequestHandler,isAdminRoute as RequestHandler, trashTask);

router.delete("/delete-restore/:id?",protectedRoute as RequestHandler,isAdminRoute as RequestHandler, deleteRestoreTask);

export default router;
