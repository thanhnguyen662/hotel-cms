/*
  Warnings:

  - You are about to drop the column `customerId` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_customerId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "customerId";

-- CreateTable
CREATE TABLE "CustomerOrderItemRoom" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER,
    "orderItemId" INTEGER,

    CONSTRAINT "CustomerOrderItemRoom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerOrderItemRoom_id_key" ON "CustomerOrderItemRoom"("id");

-- AddForeignKey
ALTER TABLE "CustomerOrderItemRoom" ADD CONSTRAINT "CustomerOrderItemRoom_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerOrderItemRoom" ADD CONSTRAINT "CustomerOrderItemRoom_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
