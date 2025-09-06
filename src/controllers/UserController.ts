import { Request, Response, NextFunction } from "express";

class UserController {
    async create(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json();
    }
}

export { UserController };
