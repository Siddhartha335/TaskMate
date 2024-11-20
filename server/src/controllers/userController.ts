import { Request, Response } from 'express';
import { createUser, validateUserLogin } from '../api/user/services/userService.js';

export async function registerUser(req: Request, res: Response) {
  try {
    const user = await createUser(req.body); 
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await validateUserLogin(email, password); 
    res.status(200).json({ message: 'Login successful', user });
  } catch (error:any) {
    res.status(401).json({ message: error.message });
  }
}
