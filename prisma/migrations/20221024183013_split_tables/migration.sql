/*
  Warnings:

  - You are about to drop the column `checkedId` on the `Todo` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Todo_checkedId_key";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "checkedId";
