/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Food` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Food_id_key" ON "Food"("id");
