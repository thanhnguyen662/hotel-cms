/*
  Warnings:

  - Added the required column `updatedAt` to the `StatusOfRoom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StatusOfRoom" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "roleId" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "StatusOfRoom" ADD CONSTRAINT "StatusOfRoom_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
