import { Router } from "express";
import { userRoutes } from "@/routes/usersRoutes";
import { sessionsRoutes } from "@/routes/sesssionsRoutes";
import { refoundsRoutes } from "@/routes/refoundsRoutes";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";

const routes = Router();

// Públicas
routes.use("/users", userRoutes);
routes.use("/sessions", sessionsRoutes);

// Privadas
routes.use(ensureAuthenticated);
routes.use("/refounds", refoundsRoutes);

export { routes };
