/*
  Warnings:

  - Made the column `finished_at` on table `games` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "games" ALTER COLUMN "finished_at" SET NOT NULL;
