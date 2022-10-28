/*
  Warnings:

  - You are about to drop the `Checked` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Checked" DROP CONSTRAINT "Checked_todoId_fkey";

-- DropTable
DROP TABLE "Checked";

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "checked" BOOLEAN NOT NULL DEFAULT false,
    "todoId" INTEGER NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Status_todoId_key" ON "Status"("todoId");

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
