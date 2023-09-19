/*
  Warnings:

  - You are about to drop the column `finished_At` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `games` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "games" DROP COLUMN "finished_At",
DROP COLUMN "name",
ADD COLUMN     "finished_at" TIMESTAMP(3),
ADD COLUMN     "number_of_fakers" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "iniciated_at" SET DEFAULT CURRENT_TIMESTAMP;
