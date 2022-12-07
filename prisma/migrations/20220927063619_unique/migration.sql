/*
  Warnings:

  - A unique constraint covering the columns `[groupId,userId]` on the table `GroupUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GroupUser_groupId_userId_key" ON "GroupUser"("groupId", "userId");
