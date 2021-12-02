-- CreateTable
CREATE TABLE "Sessions" (
    "sid" INTEGER NOT NULL,
    "expire" TIMESTAMP(3) NOT NULL,
    "sess" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Sessions_pkey" PRIMARY KEY ("sid")
);
