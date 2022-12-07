/*
  Warnings:

  - You are about to drop the column `Type` on the `GroupMessage` table. All the data in the column will be lost.
  - Added the required column `type` to the `GroupMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GroupMessage" DROP COLUMN "Type",
ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "type" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false;
