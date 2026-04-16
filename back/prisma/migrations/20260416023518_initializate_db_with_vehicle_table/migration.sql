-- CreateEnum
CREATE TYPE "Category" AS ENUM ('HATCH', 'SEDAN', 'SUV', 'PICKUP', 'COUPE', 'VAN', 'ELECTRIC');

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "version" TEXT,
    "year" INTEGER NOT NULL,
    "category" "Category" NOT NULL,
    "consumptionCityG" DOUBLE PRECISION,
    "consumptionHwyG" DOUBLE PRECISION,
    "consumptionCityE" DOUBLE PRECISION,
    "consumptionHwyE" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Vehicle_brand_model_idx" ON "Vehicle"("brand", "model");
