-- CreateTable
CREATE TABLE "ServiceHistory" (
    "id" SERIAL NOT NULL,
    "oderItemId" INTEGER,
    "serviceId" INTEGER,
    "servedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServiceHistory_id_key" ON "ServiceHistory"("id");

-- AddForeignKey
ALTER TABLE "ServiceHistory" ADD CONSTRAINT "ServiceHistory_oderItemId_fkey" FOREIGN KEY ("oderItemId") REFERENCES "OrderItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceHistory" ADD CONSTRAINT "ServiceHistory_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;
