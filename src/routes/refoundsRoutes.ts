import { Router } from "express";
import { RefoundsController } from "@/controllers/RefoundsController";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const refoundsRoutes = Router();
const refoundsController = new RefoundsController();

refoundsRoutes.post(
    "/",
    verifyUserAuthorization(["manager"]),
    refoundsController.create
);

export { refoundsRoutes };
