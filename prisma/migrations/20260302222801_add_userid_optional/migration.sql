/*
  Warnings:

  - You are about to drop the column `createdBy` on the `Poll` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Poll` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Poll" DROP CONSTRAINT "Poll_createdBy_fkey";

-- DropIndex
DROP INDEX "Poll_createdBy_idx";

-- AlterTable
ALTER TABLE "Poll" DROP COLUMN "createdBy",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Poll_userId_idx" ON "Poll"("userId");

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
