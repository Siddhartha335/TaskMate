import prisma from "../../../utils/db.js";

export async function taskCreate(userId:any, data:any) {

    const { title, team, stage, date, priority, assets } = data;

    const taskDate = date ? new Date(date) : new Date();
    if (isNaN(taskDate.getTime())) {
      throw new Error("Invalid date provided");
    }

    let text = "New task has been assigned to you";
    if (team?.length > 1) {
      text = text + ` and ${team?.length - 1} others.`;
    }

    text =
      text +
      ` The task priority is set a ${priority} priority, so check and act accordingly. The task date is ${taskDate.toDateString()}. Thank you!!!`;

    const task = await prisma.task.create({
      data: {
        title,
        stage: stage,
        date:taskDate,
        description:"",
        priority: priority,
        assets: assets || [],  
        team: {
            connect: team.map((user:any) => ({ id: user.id }))
        },
        activities:{
            create:{
                type:"ASSIGNED",
                activity : text,
                by: {
                  connect: { id: userId }
                }
            }
        }
      },
      include: {
        activities: true, // Include activities in the response
      }
    })

    await prisma.notice.create({
        data:{
            text,
            taskId: task.id,
            team: {
                connect: team.map((user:any) => ({ id: user.id }))
            }
        }
    })

    return task
}

export async function taskDuplicate(id:any) {
  
  const task = await prisma.task.findUnique({
    where: { id: id },
    include: {
      team: true, 
      subTasks: true,
      notices: true, 
    },
  });

  if(!task) throw new Error('Task not found');

  const newTask = await prisma.task.create({
    data: {
      title: task.title + " - Duplicate",  
      date: task.date,                     
      priority: task.priority,            
      stage: task.stage,                   
      description: task.description,       
      assets: task.assets,                 
      team: { connect: task.team.map(user => ({ id: user.id })) },
      subTasks: { connect: task.subTasks.map(subTask => ({ id: subTask.id })) }, 
      userId: task.userId,                 
    },
  });

  let text = "New task has been assigned to you";
    if (task.team.length > 1) {
      text += ` and ${task.team.length - 1} others.`;
    }

    text += ` The task priority is set as ${task.priority} priority, so check and act accordingly. The task date is ${task.date.toDateString()}. Thank you!!!`;

  await prisma.notice.create({
      data:{
          text,
          taskId: newTask.id,
          team: {
              connect: task.team.map((user) => ({ id: user.id }))
          }
      }
  })

}

export async function taskActivity(id:any,userId:any,data:any) {

  const task = await prisma.task.findUnique({
    where: { id: id },
  }); 

  if(!task) throw new Error('Task not found');

  const newActivity = await prisma.activity.create({
    data:{
      type: data.type,
      activity: data.activity,
      userId: userId,
      taskId: Number(task.id)
    }
  })
  return newActivity;

}

export async function dashboardStat(userId:any,isAdmin:boolean) {

  const allTasks = await prisma.task.findMany({
    where: {
      isTrashed: false,
      ...(isAdmin
        ? {}
        : {
            team: {
              some: { id: userId },  // Check if the user is part of the task's team
            },
          }),
    },
    include: {
      team: { 
        select: { name: true, role: true, title: true, email: true } 
      },
    },
    orderBy: { id: 'desc' }, 
  });

  const users = await prisma.user.findMany({
    where: { isActive: true },
    select: { name: true, title: true, role: true, isAdmin: true, createdAt: true, isActive: true },
    take: 10,
    orderBy: { id: 'desc' },  // Sort by creation date
  });

  const groupTasksByStage = allTasks.reduce((result, task) => {
    const stage = task.stage;
    if (!(result as any)[stage]) {
      (result as any)[stage] = 1;
    } else {
      (result as any)[stage] += 1;
    }
    return result;
  }, {});

  const groupTasksByPriority = Object.entries(
    allTasks.reduce((result, task) => {
      const { priority } = task;
      (result as any)[priority] = ((result as any)[priority] || 0) + 1;
      return result;
    }, {})
  ).map(([name, total]) => ({ name, total }));

  const totalTasks = allTasks.length;
  const last10Tasks = allTasks.slice(0, 10);

  const summary = {
    totalTasks,
    last10Tasks,
    users: isAdmin ? users : [],
    tasks: groupTasksByStage,
    graphData: groupTasksByPriority,
  };

  return summary;
}

export async function selectTasks(stage:any,isTrashed:false) {

  const where = {
    isTrashed: isTrashed ? true : false,
    ...(stage && { stage }),  // Only add stage filter if it's provided
  };

  const tasks = await prisma.task.findMany({
    where,
    include: {
      team:{
        select:{name:true,title:true,email:true}
      },
      subTasks: true
    },
    orderBy: { id: 'desc' }, 
  })

  return tasks;

}

export async function selectTask(id:any) {
  
  const task = await prisma.task.findUnique({
    where:{id:id},
    include:{
      team:{
        select:{name:true,title:true,email:true}
      },
      activities:{
        include:{
          by:{
            select:{name:true}
          }
        }
      },
      subTasks: true
    }
  })

  if(!task) throw new Error('Task not found');

  return task;

}

export async function subTaskCreate(id:any,data:any) {

  const formattedDate = new Date(data.date).toISOString();
  console.log(data);

  const newSubTask = await prisma.subTask.create({
    data:{
      title: data.title,
      tag: data.tag,
      date:formattedDate,
      task:{
        connect:{
          id:id
        }
      }
    }
  })
  if(!newSubTask) throw new Error('Subtask not created');
  return newSubTask;
}

export async function taskUpdate(id:any,data:any) {

  const formattedDate = new Date(data.date).toISOString();
  console.log(data);

  const updatedTask = await prisma.task.update({
    where:{
      id:id
    },
    data:{
      title:data.title,
      date:formattedDate,
      priority:data.priority,
      assets:data.assets,
      stage: data.stage,
      team:{
        connect:data.team
      }
    }
  })
  if(!updatedTask) throw new Error('Task not updated');
  return updatedTask;
}

export async function deleteTask(id:number) {

  const task = await prisma.task.findUnique({
    where:{id:id}
  })
  if(!task) throw new Error('Task not found');
  return await prisma.task.update({
    where:{id:id},
    data:{isTrashed:true}
  })

}

export async function restoreTask(id:any,actionType:any) {

  const intId = parseInt(id, 10);

  if(actionType === "delete") {
    return await prisma.task.delete({
      where:{
        id:intId
      }
    })
  } else if(actionType === "deleteAll") {
    return await prisma.task.deleteMany({
      where:{isTrashed:true}
    });
  } else if(actionType === 'restore') {
    const task = await prisma.task.findUnique({
      where:{id:intId},
    })
    if(!task) throw new Error('Task not found');
    return await prisma.task.update({
      where:{id:intId},
      data:{isTrashed:false}
    })
  } else if(actionType === 'restoreAll') {
    return await prisma.task.updateMany({
      where:{isTrashed:true},
      data:{isTrashed:false},
  });
  } else throw new Error('Invalid action type');

}