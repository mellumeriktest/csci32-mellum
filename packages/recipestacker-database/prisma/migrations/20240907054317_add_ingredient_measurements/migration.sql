/*
  Warnings:

  - You are about to drop the `_IngredientToRecipe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `_IngredientToRecipe`;

-- CreateTable
CREATE TABLE `IngredientMeasurement` (
    `ingredient_measurement_id` VARCHAR(191) NOT NULL,
    `ingredient_id` VARCHAR(191) NOT NULL,
    `unit` VARCHAR(191) NULL,
    `quantity` VARCHAR(191) NULL,

    PRIMARY KEY (`ingredient_measurement_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_IngredientMeasurementToRecipe` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_IngredientMeasurementToRecipe_AB_unique`(`A`, `B`),
    INDEX `_IngredientMeasurementToRecipe_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
