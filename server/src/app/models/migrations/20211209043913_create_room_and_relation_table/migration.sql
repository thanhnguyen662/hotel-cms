-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "number" TEXT,
    "floor" INTEGER,
    "note" TEXT,
    "roomStatusId" INTEGER,
    "updateStatusdAt" TIMESTAMP(3),

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomDetail" (
    "id" SERIAL NOT NULL,
    "img" TEXT[],
    "price" INTEGER,
    "bedroom" TEXT,
    "properties" TEXT,
    "roomId" INTEGER,

    CONSTRAINT "RoomDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomStatus" (
    "id" SERIAL NOT NULL,
    "status" TEXT,
    "note" TEXT,

    CONSTRAINT "RoomStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoomDetail_roomId_key" ON "RoomDetail"("roomId");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_roomStatusId_fkey" FOREIGN KEY ("roomStatusId") REFERENCES "RoomStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomDetail" ADD CONSTRAINT "RoomDetail_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
