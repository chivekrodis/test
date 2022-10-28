-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "checkedId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Checked" (
    "id" SERIAL NOT NULL,
    "checked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Checked_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_checkedId_fkey" FOREIGN KEY ("checkedId") REFERENCES "Checked"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
