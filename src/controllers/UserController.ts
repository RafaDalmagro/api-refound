import { prisma } from "@/databases/prisma";
import { AppError } from "@/utils/AppError";
import { UserRole } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { hash } from "bcrypt";

class UserController {
    async create(req: Request, res: Response, next: NextFunction) {
        const bodySchema = z.object({
            name: z
                .string({ message: "O nome é obrigatório" })
                .trim()
                .min(2, { message: "O nome deve ter no mínimo 2 caracteres" }),
            email: z
                .string({ message: "O email é obrigatório" })
                .trim()
                .email({ message: "O email deve ser válido" })
                .toLowerCase(),
            password: z
                .string({ message: "A senha é obrigatória" })
                .trim()
                .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
            role: z
                .enum([UserRole.employee, UserRole.manager])
                .default(UserRole.employee),
        });

        const { name, email, password, role } = bodySchema.parse(req.body);

        const userWithSameEmail = await prisma.user.findUnique({
            where: { email },
        });

        if (userWithSameEmail) {
            throw new AppError(
                "Já existe um usuário cadastrado com esse email.",
                400
            );
        }

        const hashedPassword = await hash(password, 10);

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
            },
        });

        return res.status(201).json();
    }
}

export { UserController };
