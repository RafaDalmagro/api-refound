import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { prisma } from "@/databases/prisma";
import { AppError } from "@/utils/AppError";

const CategoriesEnum = z.enum(["food", "transport", "others", "acomodation"]);

class RefoundsController {
    async index(req: Request, res: Response, next: NextFunction) {
        const querySchema = z.object({
            name: z.string().optional().default(""),
            page: z.coerce.number().optional().default(1),
            perPage: z.coerce.number().optional().default(10),
        });

        const { name, page, perPage } = querySchema.parse(req.query);

        const skip = (page - 1) * perPage;

        const refounds = await prisma.refounds.findMany({
            skip,
            take: perPage,
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

        const totalRecords = await prisma.refounds.count({
            where: {
                user: {
                    name: {
                        contains: name.trim(),
                    },
                },
            },
        });

        const totalPages = Math.ceil(totalRecords / perPage);

        return res.json({
            refounds,
            pagination: {
                totalRecords,
                totalPages: totalPages > 0 ? totalPages : 1,
                page,
                perPage,
            },
        });
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

    async show(req: Request, res: Response, next: NextFunction) {
        const paramsSchema = z.object({
            id: z.string().uuid({ message: "ID inválido." }),
        });

        const { id } = paramsSchema.parse(req.params);

        const refound = await prisma.refounds.findFirst({
            where: { id },
            include: {
                user: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        return res.json({ refound });
    }
}

export { RefoundsController };
