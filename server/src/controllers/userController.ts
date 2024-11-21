import { Request, Response } from 'express';
import { createUser, validateUserLogin } from '../api/user/services/userService.js';
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