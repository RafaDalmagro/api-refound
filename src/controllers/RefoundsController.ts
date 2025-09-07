import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const CategoriesEnum = z.enum(["food", "transport", "others", "accommodation"]);

class RefoundsController {
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

        return res.status(201).json({ message: "Create" });
    }
}

export { RefoundsController };
