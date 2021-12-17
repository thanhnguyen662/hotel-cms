/*
  Warnings:

  - You are about to drop the column `properties` on the `RoomDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RoomDetail" DROP COLUMN "properties",
ADD COLUMN     "type" TEXT;
