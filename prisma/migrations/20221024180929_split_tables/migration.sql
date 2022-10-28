-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_checkedId_fkey";

-- AlterTable
ALTER TABLE "Checked" ADD COLUMN     "todoId" INTEGER;

-- AddForeignKey
ALTER TABLE "Checked" ADD CONSTRAINT "Checked_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE SET NULL ON UPDATE SET DEFAULT;
