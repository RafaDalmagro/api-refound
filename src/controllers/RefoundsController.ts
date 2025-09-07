import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { prisma } from "@/databases/prisma";
import { AppError } from "@/utils/AppError";

const CategoriesEnum = z.enum(["food", "transport", "others", "acomodation"]);

class RefoundsController {
    async index(req: Request, res: Response, next: NextFunction) {
        const querySchema = z.object({
            name: z.string().optional().default(""),
        });

        const { name } = querySchema.parse(req.query);

        const refounds = await prisma.refounds.findMany({
            where: {
                user: {
                    name: {
                        contains: name.trim(),
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        return res.json({ refounds });
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const bodySchema = z.object({
            name: z
                .string()
                .trim()
                .min(2, { message: "Informe o nome da solicitação." }),
            category: CategoriesEnum,
            amount: z
                .number()
                .positive({ message: "O valor deve ser positivo." }),
            filename: z.string().min(20),
        });

        const { name, category, amount, filename } = bodySchema.parse(req.body);

        if (!req.user?.id) {
            throw new AppError("Usuário não autorizado", 401);
        }

        const refound = await prisma.refounds.create({
            data: {
                name,
                category,
                amount,
                filename,
                userId: req.user.id,
            },
        });

        return res.status(201).json(refound);
    }
}

export { RefoundsController };
