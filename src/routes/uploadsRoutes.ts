import { Router } from "express";
import { UploadsController } from "@/controllers/UploadsController";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
import multer from "multer";
import uploadConfig from "@/config/upload";

const uploadsRoutes = Router();
const uploadsController = new UploadsController();
const upload = multer(uploadConfig.MULTER);

uploadsRoutes.use(verifyUserAuthorization(["employee"]));
uploadsRoutes.post("/", upload.single("file"), uploadsController.create);

export { uploadsRoutes };
