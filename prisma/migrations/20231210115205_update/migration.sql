/*
  Warnings:

  - You are about to drop the column `receiver` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `sender` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `receiverId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `receiver`,
    DROP COLUMN `sender`,
    ADD COLUMN `receiverId` INTEGER NOT NULL,
    ADD COLUMN `senderId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
