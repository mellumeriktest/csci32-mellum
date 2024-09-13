/*
  Warnings:

  - You are about to alter the column `quantity` on the `IngredientMeasurement` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `IngredientMeasurement` MODIFY `quantity` INTEGER NULL;

-- CreateTable
CREATE TABLE `Node` (
    `node_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `parent_id` VARCHAR(191) NULL,

    PRIMARY KEY (`node_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
