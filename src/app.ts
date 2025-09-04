import express from "express";
import cors from "cors";
import { errorHandling } from "@/middlewares/errorHandling";
import { z } from "zod";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    const bodySchema = z.object({
        name: z.string(),
    });

	const { name } = bodySchema.parse(req.body);

    return res.send(`Hello, ${name}!`);
});

app.use(errorHandling);

export { app };
