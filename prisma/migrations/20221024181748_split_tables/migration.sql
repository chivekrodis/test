/*
  Warnings:

  - A unique constraint covering the columns `[todoId]` on the table `Checked` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `todoId` to the `Checked` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_checkedId_fkey";

-- AlterTable
ALTER TABLE "Checked" ADD COLUMN     "todoId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Checked_todoId_key" ON "Checked"("todoId");

-- AddForeignKey
ALTER TABLE "Checked" ADD CONSTRAINT "Checked_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
