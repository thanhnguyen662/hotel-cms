/*
  Warnings:

  - Added the required column `tickets` to the `ServiceHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ServiceHistory" ADD COLUMN     "tickets" INTEGER NOT NULL;
