-- AlterTable
ALTER TABLE `Book` ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL DEFAULT 'https://via.placeholder.com/150';
