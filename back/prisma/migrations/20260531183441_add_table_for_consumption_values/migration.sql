/*
  Warnings:

  - You are about to drop the column `consumptionCityD` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `consumptionCityE` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `consumptionCityG` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `consumptionHwyD` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `consumptionHwyE` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `consumptionHwyG` on the `Vehicle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "consumptionCityD",
DROP COLUMN "consumptionCityE",
DROP COLUMN "consumptionCityG",
DROP COLUMN "consumptionHwyD",
DROP COLUMN "consumptionHwyE",
DROP COLUMN "consumptionHwyG";

-- CreateTable
CREATE TABLE "Consumption" (
    "id" SERIAL NOT NULL,
    "consumptionCityG" DOUBLE PRECISION,
    "consumptionHwyG" DOUBLE PRECISION,
    "consumptionCityE" DOUBLE PRECISION,
    "consumptionHwyE" DOUBLE PRECISION,
    "consumptionCityD" DOUBLE PRECISION,
    "consumptionHwyD" DOUBLE PRECISION,
    "consumptionCityW" DOUBLE PRECISION,
    "consumptionHwyW" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vehicleId" INTEGER NOT NULL,

    CONSTRAINT "Consumption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Consumption_vehicleId_key" ON "Consumption"("vehicleId");

-- AddForeignKey
ALTER TABLE "Consumption" ADD CONSTRAINT "Consumption_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
