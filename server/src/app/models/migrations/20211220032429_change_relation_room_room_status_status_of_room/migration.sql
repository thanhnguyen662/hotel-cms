/*
  Warnings:

  - You are about to drop the column `roomStatusId` on the `Room` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_roomStatusId_fkey";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "roomStatusId";

-- CreateTable
CREATE TABLE "StatusOfRoom" (
    "id" SERIAL NOT NULL,
    "roomStatusId" INTEGER,
    "roomId" INTEGER,

    CONSTRAINT "StatusOfRoom_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StatusOfRoom" ADD CONSTRAINT "StatusOfRoom_roomStatusId_fkey" FOREIGN KEY ("roomStatusId") REFERENCES "RoomStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatusOfRoom" ADD CONSTRAINT "StatusOfRoom_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
