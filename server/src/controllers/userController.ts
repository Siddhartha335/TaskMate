import { Request, Response } from 'express';
import { createUser, validateUserLogin, listTeamMembers, listNotifications, updateUser, markNotification, changePassword, activateUser, deleteUser } from '../api/user/services/userService.js';
import { createJWT } from '../api/user/utils/jwtUtils.js';

export async function registerUser(req: Request, res: Response) {
  try {
    const user = await createUser(req.body); 
    res.status(201).json(user);

    if (user) {
      user.isAdmin ? createJWT(res, user.id) : null;
      user.password = undefined as any;
      res.status(201).json(user);
    } else {
      return res.status(400).json({ status: false, message: "Invalid credentials" });
    }

  } catch (error: any) {
    res.status(400).json({status:false, message: error.message });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await validateUserLogin(email, password); 

    if(!user?.isActive) {
      return res.status(401).json({ status: false, message: "User account has been deactivated, contact admin" });
    }

    if (user) {
      createJWT(res, user.id);
      user.password = undefined as any;
      res.status(200).json(user);
    }
    
  } catch (error:any) {
    res.status(401).json({ status: false, message: error.message });
  }
}

export async function logoutUser(req: Request, res: Response) {
  try {
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0)
    });
    res.status(200).json({ status: true, message: "Logged out successfully" });
  } catch (error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
}

export async function getTeamList(req: Request, res: Response) {
  try {
    const users = await listTeamMembers();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
}


export async function getNotificationList(req: Request, res: Response) {
  try {
   const {userId} = (req as any).user;
   const notices = await listNotifications(userId);
   res.status(201).json(notices);
  } catch (error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
}

export async function updateUserProfile(req: Request, res: Response) {
  try {
   const {userId, isAdmin} = (req as any).user;
   const {id} = req.body;
   const specificId = isAdmin && userId === id ? userId : isAdmin && userId !== id ? id : userId;
   const updatedUser = await updateUser(specificId, req.body);
   res.status(201).json({
     status: true,
     message: "User updated successfully",
     user: updatedUser
   });

  } catch (error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
}

export async function markNotificationAsRead(req: Request, res: Response) {
  try {
   const {userId} = (req as any).user;
   const {isReadType, id} = req.query;
   await markNotification(userId, isReadType as string, id);
   res.status(201).json({
     status: true,
     message: "Notification marked as read"
   })
  } catch (error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
}

export async function changeUserPassword(req: Request, res: Response) {
  try{
    const {userId} = (req as any).user;
    await changePassword(userId, req.body);
    res.status(201).json({
      status: true,
      message: "Password changed successfully"
    })
  }
  catch(error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
}

export async function activateUserProfile(req: Request, res: Response) {
  try{
    const {id} = req.params;
    const activatedUser = await activateUser(id, req.body);
    res.status(201).json({
      status: true,
      message: `User account has been ${activatedUser.isActive ? "activated" : "disabled"}`,
    })
  }
  catch(error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
}

export async function deleteUserProfile(req: Request, res: Response) {
  try{
    const {id} = req.params;
    const deletedUser = await deleteUser(id);
    res.status(201).json({
      status: true,
      message: "User deleted successfully",
      user: deletedUser
    })
  }
  catch(error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
}