import { Router } from "express";
import { userRoutes } from "@/routes/usersRoutes";

const routes = Router();

routes.use("/users", userRoutes);

export { routes };
