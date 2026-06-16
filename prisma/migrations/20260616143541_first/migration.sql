/*
  Warnings:

  - You are about to drop the `autor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `capaUrl` to the `Livro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `editedAt` to the `Livro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `editora` to the `Livro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genero` to the `Livro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numeroEdicao` to the `Livro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidade` to the `Livro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sinopse` to the `Livro` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FuncaoUsuario" AS ENUM ('ADMIN', 'USER', 'BIBLIOTECARIO');

-- DropForeignKey
ALTER TABLE "Livro" DROP CONSTRAINT "Livro_autorId_fkey";

-- AlterTable
ALTER TABLE "Livro" ADD COLUMN     "capaUrl" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "editedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "editora" TEXT NOT NULL,
ADD COLUMN     "genero" TEXT NOT NULL,
ADD COLUMN     "numeroEdicao" TEXT NOT NULL,
ADD COLUMN     "quantidade" INTEGER NOT NULL,
ADD COLUMN     "sinopse" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "autor";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3) NOT NULL,
    "dataNascimento" TIMESTAMP(3),
    "avatarUrl" TEXT,
    "funcao" "FuncaoUsuario" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Autor" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Autor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Emprestimo" (
    "id" TEXT NOT NULL,
    "livroId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dataEmprestimo" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataDevolucao" TIMESTAMP(3),

    CONSTRAINT "Emprestimo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "id" TEXT NOT NULL,
    "livroId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dataReserva" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataDevolucao" TIMESTAMP(3),

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Livro" ADD CONSTRAINT "Livro_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Autor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Livro" ADD CONSTRAINT "Livro_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emprestimo" ADD CONSTRAINT "Emprestimo_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "Livro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emprestimo" ADD CONSTRAINT "Emprestimo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "Livro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
