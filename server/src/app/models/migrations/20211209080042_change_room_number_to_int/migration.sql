/*
  Warnings:

  - The `number` column on the `Room` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "number",
ADD COLUMN     "number" INTEGER;
