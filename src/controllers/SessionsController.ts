import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { prisma } from "@/databases/prisma";
import { AppError } from "@/utils/AppError";
import { compare } from "bcrypt";
import { authConfig } from "@/config/auth";
import { sign } from "jsonwebtoken";

class SessionsController {
    async create(req: Request, res: Response, next: NextFunction) {
        const bodySchema = z.object({
            email: z.string().email({ message: "E-mail inválido" }),
            password: z.string(),
        });

        const { email, password } = bodySchema.parse(req.body);

        const user = await prisma.user.findFirst({
            where: {
                email,
            },
        });

        if (!user) {
            throw new AppError("E-mail ou senha inválidos", 401);
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("E-mail ou senha inválidos", 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({ role: user.role }, secret, {
            subject: user.id,
            expiresIn,
        });

        const { password: _, ...userWithoutPassword } = user;

        return res.status(201).json({ token, user: userWithoutPassword });
    }
}

export { SessionsController };
