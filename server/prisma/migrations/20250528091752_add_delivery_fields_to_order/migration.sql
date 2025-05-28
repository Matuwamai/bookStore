/*
  Warnings:

  - Added the required column `deliveryContact` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryLocation` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `deliveryContact` VARCHAR(191) NOT NULL,
    ADD COLUMN `deliveryLocation` VARCHAR(191) NOT NULL,
    ADD COLUMN `deliveryNotes` VARCHAR(191) NULL;
