/*
  Warnings:

  - Added the required column `description` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NotiType" AS ENUM ('ALERT', 'MESSAGE');

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "description" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "notices" (
    "_id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "taskId" INTEGER,
    "notiType" "NotiType" NOT NULL DEFAULT 'ALERT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notices_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "_UserNotices" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserReadsNotice" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserNotices_AB_unique" ON "_UserNotices"("A", "B");

-- CreateIndex
CREATE INDEX "_UserNotices_B_index" ON "_UserNotices"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserReadsNotice_AB_unique" ON "_UserReadsNotice"("A", "B");

-- CreateIndex
CREATE INDEX "_UserReadsNotice_B_index" ON "_UserReadsNotice"("B");

-- AddForeignKey
ALTER TABLE "notices" ADD CONSTRAINT "notices_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserNotices" ADD CONSTRAINT "_UserNotices_A_fkey" FOREIGN KEY ("A") REFERENCES "notices"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserNotices" ADD CONSTRAINT "_UserNotices_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserReadsNotice" ADD CONSTRAINT "_UserReadsNotice_A_fkey" FOREIGN KEY ("A") REFERENCES "notices"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserReadsNotice" ADD CONSTRAINT "_UserReadsNotice_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
