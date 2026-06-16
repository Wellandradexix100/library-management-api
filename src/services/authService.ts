import { prisma } from "../../lib/prisma";
import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const registerSchema = z.object({
    nome: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
});

const secret = process.env.JWT_SECRET || "secret";

export async function loginService(email: string, password: string) {
    const { email: validEmail, password: validPassword } = loginSchema.parse({
        email,
        password,
    });

    const user = await prisma.user.findUnique({ where: { email: validEmail } });

    if (!user) {
        throw new Error("Usuário não encontrado");
    }

    const isPasswordValid = await bcrypt.compare(
        validPassword,
        user.senha
    );

    if (!isPasswordValid) {
        throw new Error("Senha inválida");
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, funcao: user.funcao },
        secret,
        { expiresIn: "1d" }
    );

    return {
        user: { id: user.id, email: user.email, nome: user.nome, funcao: user.funcao },
        token,
    };
}

export async function registerService(nome: string, email: string, password: string) {
    const { nome: validNome, email: validEmail, password: validPassword } = registerSchema.parse({
        nome,
        email,
        password,
    });

    const existingUser = await prisma.user.findUnique({ where: { email: validEmail } });
    if (existingUser) {
        throw new Error("Email já cadastrado");
    }

    const hashedPassword = await bcrypt.hash(validPassword, 10);

    const user = await prisma.user.create({
        data: {
            nome: validNome,
            email: validEmail,
            senha: hashedPassword
        },
        select: {
            id: true,
            email: true,
            nome: true,
            funcao: true
        },
    });

    const token = jwt.sign(
        { id: user.id, email: user.email, funcao: user.funcao },
        secret,
        { expiresIn: "1d" }
    );

    return {
        user,
        token,
    };
}

export const createAdminService = async (nome: string, email: string, password: string) => {
    const { nome: validNome, email: validEmail, password: validPassword } = registerSchema.parse({
        nome,
        email,
        password,
    });

    const existingUser = await prisma.user.findUnique({ where: { email: validEmail } });
    if (existingUser) {
        throw new Error("Email já cadastrado");
    }

    const hashedPassword = await bcrypt.hash(validPassword, 10);

    const user = await prisma.user.create({
        data: {
            nome: validNome,
            email: validEmail,
            senha: hashedPassword,
            funcao: "ADMIN"
        },
        select: {
            id: true,
            email: true,
            nome: true,
            funcao: true
        },
    });

    const token = jwt.sign(
        { id: user.id, email: user.email, funcao: user.funcao },
        secret,
        { expiresIn: "1d" }
    );

    return {
        user,
        token,
    };
}