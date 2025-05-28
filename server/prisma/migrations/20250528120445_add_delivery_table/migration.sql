/*
  Warnings:

  - You are about to drop the column `orderDate` on the `orders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[deliveryId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `orders` DROP COLUMN `orderDate`,
    ADD COLUMN `deliveryId` INTEGER NULL;

-- CreateTable
CREATE TABLE `deliveries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `carrierName` VARCHAR(191) NOT NULL,
    `driverName` VARCHAR(191) NOT NULL,
    `driverContact` VARCHAR(191) NOT NULL,
    `carRegistration` VARCHAR(191) NOT NULL,
    `scheduledDate` DATETIME(3) NOT NULL,
    `actualDate` DATETIME(3) NULL,
    `status` ENUM('PENDING', 'ASSIGNED', 'IN_TRANSIT', 'DELIVERED', 'FAILED', 'RETURNED') NOT NULL DEFAULT 'PENDING',
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `orders_deliveryId_key` ON `orders`(`deliveryId`);

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_deliveryId_fkey` FOREIGN KEY (`deliveryId`) REFERENCES `deliveries`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
