import {body,validationResult} from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const taskValidator = [
    body('title').isString().withMessage('Title is required and should be a string'),
    
    body('stage')
      .isIn(['TODO', 'IN_PROGRESS', 'COMPLETED'])
      .withMessage('Stage must be one of the following: TODO, IN_PROGRESS, COMPLETED'),
  
    body('priority')
      .isIn(['LOW', 'NORMAL', 'HIGH','MEDIUM'])
      .withMessage('Priority must be one of the following: LOW, NORMAL, HIGH, MEDIUM'),
  ];
  
  // Middleware to check validation results
  export const validateTask = (req:Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };