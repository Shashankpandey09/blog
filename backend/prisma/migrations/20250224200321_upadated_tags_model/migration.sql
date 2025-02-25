/*
  Warnings:

  - A unique constraint covering the columns `[tagName]` on the table `Tags` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tags_tagName_key" ON "Tags"("tagName");
