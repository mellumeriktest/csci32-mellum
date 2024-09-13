/*
  Warnings:

  - The primary key for the `IngredientMeasurement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ingredient_measurement_id` on the `IngredientMeasurement` table. All the data in the column will be lost.
  - You are about to drop the `_IngredientMeasurementToRecipe` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `recipe_id` to the `IngredientMeasurement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `IngredientMeasurement` DROP PRIMARY KEY,
    DROP COLUMN `ingredient_measurement_id`,
    ADD COLUMN `recipe_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`ingredient_id`, `recipe_id`);

-- DropTable
DROP TABLE `_IngredientMeasurementToRecipe`;
