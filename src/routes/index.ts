import { Router } from "express";
import { userRoutes } from "@/routes/usersRoutes";
import { sessionsRoutes } from "@/routes/sesssionsRoutes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/sessions", sessionsRoutes);

export { routes };
