import { Request, Response, NextFunction } from "express";

class SessionsController {
    async create(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json({ message: "Create" });
    }
}

export { SessionsController };
