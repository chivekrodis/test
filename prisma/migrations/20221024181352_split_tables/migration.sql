-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_checkedId_fkey";

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_checkedId_fkey" FOREIGN KEY ("checkedId") REFERENCES "Checked"("id") ON DELETE SET NULL ON UPDATE SET DEFAULT;
