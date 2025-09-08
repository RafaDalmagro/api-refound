import { Request, Response, NextFunction } from "express";
import z, { ZodError } from "zod";
import uploadConfig from "@/config/upload";
import { DiskStorage } from "@/providers/diskStorage";
import { AppError } from "@/utils/AppError";

class UploadsController {
    async create(req: Request, res: Response, next: NextFunction) {
        const diskStorage = new DiskStorage();

        try {
            const fileSchema = z
                .object({
                    filename: z.string().min(1, "Arquivo é obrigatório"),
                    mimetype: z
                        .string()
                        .refine(
                            (type) =>
                                uploadConfig.ACCEPTED_IMAGE_TYPES.includes(
                                    type
                                ),
                            "Tipo de arquivo não suportado. Formatos permitidos: " +
                                uploadConfig.ACCEPTED_IMAGE_TYPES
                        ),
                    size: z
                        .number()
                        .min(0)
                        .refine(
                            (size) => size <= uploadConfig.MAX_FILE_SIZE,
                            `O arquivo deve ter no máximo ${uploadConfig.MAX_SIZE}MB`
                        ),
                })
                .passthrough();

            const file = fileSchema.parse(req.file);
            const filename = await diskStorage.saveFile(file.filename);
				
            res.status(200).json({ filename });
        } catch (error) {
            if (error instanceof ZodError) {
                if (req.file) {
                    await diskStorage.deleteFile(req.file.filename, "tmp");
                }

                throw new AppError(error.issues[0].message);
            }
            throw error;
        }
    }
    async update(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({ message: "Update" });
    }

    async show(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({ message: "Show" });
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        return res.status(204).json({ message: "Delete" });
    }
}
export { UploadsController };
