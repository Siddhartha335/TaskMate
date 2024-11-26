-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_taskId_fkey";

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
