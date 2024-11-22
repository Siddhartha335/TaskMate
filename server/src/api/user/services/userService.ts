import prisma from '../../../utils/db.js';
import { hashPassword, matchPassword } from '../utils/passwordUtils.js';

export async function createUser(data: any) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  })
  if(existingUser) throw new Error('User already exists');
  const hashedPassword = await hashPassword(data.password);
  return await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
}

export async function validateUserLogin(email: string, enteredPassword: string) {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  if (!user) throw new Error('User not found');
  const isMatch = await matchPassword(enteredPassword, user.password);
  if (!isMatch) throw new Error('Invalid credentials');
  return user;
}

export async function listTeamMembers() {
  const users = await prisma.user.findMany({
    select: {
      name: true,
      title: true,
      role: true,
      email: true,
      isActive: true,
    }
  })
  return users
}

export async function listNotifications(userId:any) {
  const notices = await prisma.notice.findMany({
    where: {
      team:{
        some: {
          id: userId
        }
      },
      NOT: {
        isRead: {
          some: {
            id: userId,
          },
        }
      },
    },
    include: {
      task: {
        select: {
          title: true
        }
      }
    }
  });
  return notices
}

export async function updateUser(userId: any, data: any) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if(user) {
    user.name = data.name || user.name;
    user.title = data.title || user.title;
    user.role = data.role || user.role; 
    user.password = undefined as any;
    return await prisma.user.update({
      where: { id: userId },
      data: user,
    });
  } else {
    throw new Error('User not found');
  }
}

export async function markNotification(userId:any,isReadType:string,id:any) {
  if (isReadType === "all") {
    const notices = await prisma.notice.findMany({
      where: {
        team: {
          some: {
            id: userId, // Check if the userId is part of the 'team' relation
          },
        },
        NOT: {
          isRead: {
            some: {
              id: userId, // Check if userId is NOT in the 'isRead' relation
            },
          },
        },
      },
    });

    // Update each notice to mark it as read for the user
    for (const notice of notices) {
      return await prisma.notice.update({
        where: {
          id: notice.id, // Find the notice by its ID
        },
        data: {
          isRead: {
            connect: {
              id: userId, // Add userId to the 'isRead' relation
            },
          },
        },
      });
    }
  } else {
    return await prisma.notice.update({
      where: {
        id: id,
        isRead: {
          none: {
            id: userId, // Check if userId is not in 'isRead'
          },
        },
      },
      data: {
        isRead: {
          connect: {
            id: userId, // Add userId to the 'isRead' relation
          },
        },
      },
    });
  } 
}

export async function changePassword(userId:any,data:any) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })
  if(user) {
    const hashedPassword = await hashPassword(data.password);
    return await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword
      }
    })
  } else {
    throw new Error('User not found');
  }
}

export async function activateUser(userId:any, data:any) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })
  if(user) {
    user.isActive = data.isActive
    return await prisma.user.update({
      where: { id: userId },
      data: user
    })
  } else {
    throw new Error('User not found');
  }
}

export async function deleteUser(userId:any) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })
  if(user) {
    return await prisma.user.delete({
      where: { id: userId },
    })
  } else {
    throw new Error('User not found');
  }
}