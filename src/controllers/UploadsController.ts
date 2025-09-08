import { Request, Response, NextFunction } from "express";


class UploadsController {
    async index(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({ message: "Index" });
    }

    async create(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json({ message: "Create" });
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
