-- DropForeignKey
ALTER TABLE "subtasks" DROP CONSTRAINT "subtasks_taskId_fkey";

-- AddForeignKey
ALTER TABLE "subtasks" ADD CONSTRAINT "subtasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
