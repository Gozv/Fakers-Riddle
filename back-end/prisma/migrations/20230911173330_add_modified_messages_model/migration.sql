/*
  Warnings:

  - You are about to drop the column `game_id` on the `messages` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_game_id_fkey";

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "game_id";
