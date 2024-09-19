/*
  Warnings:

  - Made the column `unit` on table `IngredientMeasurement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quantity` on table `IngredientMeasurement` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `IngredientMeasurement` MODIFY `unit` VARCHAR(191) NOT NULL,
    MODIFY `quantity` INTEGER NOT NULL DEFAULT 0;
