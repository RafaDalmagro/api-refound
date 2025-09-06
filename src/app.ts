import express from "express";
import cors from "cors";

import { errorHandling } from "@/middlewares/errorHandling";
import { z } from "zod";

import { routes } from "@/routes";
const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errorHandling);

export { app };
