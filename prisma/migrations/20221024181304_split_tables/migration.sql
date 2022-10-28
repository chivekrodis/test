/*
  Warnings:

  - You are about to drop the column `todoId` on the `Checked` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[checkedId]` on the table `Todo` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Checked" DROP CONSTRAINT "Checked_todoId_fkey";

-- AlterTable
ALTER TABLE "Checked" DROP COLUMN "todoId";

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "checkedId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Todo_checkedId_key" ON "Todo"("checkedId");

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_checkedId_fkey" FOREIGN KEY ("checkedId") REFERENCES "Checked"("id") ON DELETE SET NULL ON UPDATE CASCADE;
