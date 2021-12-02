/*
  Warnings:

  - The primary key for the `Sessions` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Sessions" DROP CONSTRAINT "Sessions_pkey",
ALTER COLUMN "sid" SET DATA TYPE TEXT,
ADD CONSTRAINT "Sessions_pkey" PRIMARY KEY ("sid");
