import { Request, Response } from "express";
import { dashboardStat, taskActivity, taskCreate, taskDuplicate, selectTasks, selectTask, subTaskCreate, taskUpdate, deleteTask, restoreTask } from "../api/task/services/taskService.js";


export async function createTask(req: Request, res: Response) {
    try {
      const {userId} = (req as any).user;
      const task = await taskCreate(userId, req.body);
      res.status(200).json({
          status: true,
          task,
          message: "Task created successfully"
      })        
    } catch (error: any) {
      res.status(400).json({ status: false, message: error.message });
    }
  }

export async function duplicateTask(req: Request, res: Response) {
    try{
      const {id} = req.params
      await taskDuplicate(id);
      res.status(200).json({
        status: true,
        message: "Task duplicated successfully"
      })
    } catch(error: any) {
      res.status(400).json({ status: false, message: error.message });
    }
}

export async function postTaskActivity(req: Request, res: Response) {
  try{    
    const {id} = req.params;
    const {userId} = (req as any).user;
    const data = req.body;
    const activity = await taskActivity(id, userId, data);
    res.status(200).json({
      status: true,
      message:'Activity added successfully',
      activity
    })

  } catch(error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
}

export async function dashboardStatistics(req: Request, res: Response) {
  try {
    const {userId, isAdmin} = (req as any).user;
    const summary = await dashboardStat(userId, isAdmin);
    res.status(200).json({
      status: true,
      message:"Succesfully retrieved dashboard statistics.",
      ...summary
    })

  } catch(  error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
}

export async function getTasks(req: Request, res: Response) {
  try {
    let {stage, isTrashed} = (req as any).query;
    if(stage == "in-progress") {
      stage = "IN_PROGRESS"
    }
    const tasks = await selectTasks(stage.toUpperCase(), isTrashed);
    res.status(200).json({
      status: true,
      tasks
    })

  } catch(  error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
}

export async function getTask(req: Request, res: Response) {
  try {   
    const {id}= (req as any).params;
    const task = await selectTask(id);
    res.status(200).json({
      status: true,
      task
    })


  } catch(  error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
}


export async function createSubTask(req: Request, res: Response) {
  try {   
    const data = (req as any).body;
    const {id} = req.params;
    const newSubTask = await subTaskCreate(id, data);
    res.status(200).json({
      status:true,
      message: "Subtask created successfully",
      newSubTask
    })

  } catch(  error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
}

export async function updateTask(req: Request, res: Response) {
  try {   
    const {id} = req.params;
    const data = (req as any).body;
    const updatedTask = await taskUpdate(id, data);
    res.status(200).json({
      status:true,
      message: "Task updated successfully",
      updatedTask
    })

  } catch(  error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
}

export async function trashTask(req: Request, res: Response) {
  try {   
    const {id} = req.params
    await deleteTask(id);
    res.status(200).json({
      status: true,
      message: `Task trashed successfully.`,
    });

  } catch(  error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
}

export async function deleteRestoreTask(req: Request, res: Response) {
  try {   
    const {id} = req.params;
    const {actionType} =req.query
    await restoreTask(id, actionType);
    res.status(200).json({
      status: true,
      message: `Operation performed successfully.`,
    });

  } catch(  error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
}


