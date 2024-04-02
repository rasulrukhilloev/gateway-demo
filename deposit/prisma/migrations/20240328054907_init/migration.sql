-- CreateTable
CREATE TABLE "Deposit" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Deposit_pkey" PRIMARY KEY ("id")
);
