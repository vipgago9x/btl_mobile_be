/*
  Warnings:

  - Added the required column `status` to the `GroupUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `GroupUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GroupUser" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" INTEGER NOT NULL,
ADD COLUMN     "type" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
