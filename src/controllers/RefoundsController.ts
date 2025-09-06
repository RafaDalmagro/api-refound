import { Request, Response, NextFunction } from "express";

class RefoundsController {
	async create(req: Request, res: Response, next: NextFunction) {
		return res.status(201).json({ message: "Create" });
	}

}

export { RefoundsController };