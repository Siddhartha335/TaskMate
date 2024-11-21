/*
  Warnings:

  - You are about to drop the column `description` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `title` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('HIGH', 'MEDIUM', 'NORMAL', 'LOW');

-- CreateEnum
CREATE TYPE "Stage" AS ENUM ('TODO', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('ASSIGNED', 'STARTED', 'IN_PROGRESS', 'BUG', 'COMPLETED', 'COMMENTED');

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "assets" TEXT[],
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isTrashed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'NORMAL',
ADD COLUMN     "stage" "Stage" NOT NULL DEFAULT 'TODO',
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "activities" (
    "_id" SERIAL NOT NULL,
    "type" "ActivityType" NOT NULL DEFAULT 'ASSIGNED',
    "activity" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "subtasks" (
    "_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "tag" TEXT,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "subtasks_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "_TaskTeam" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TaskTeam_AB_unique" ON "_TaskTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_TaskTeam_B_index" ON "_TaskTeam"("B");

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subtasks" ADD CONSTRAINT "subtasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskTeam" ADD CONSTRAINT "_TaskTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "tasks"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskTeam" ADD CONSTRAINT "_TaskTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
