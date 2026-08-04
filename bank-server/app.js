import express from "express";
import cors from "cors";
import helmet from "helmet";

import routes from "./routes/index.routes.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";

const app = express();

/* ---------------- Security ---------------- */
app.use(helmet());
app.use(cors());

/* ---------------- Body Parsers ---------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------------- Health Check ---------------- */
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "NeonBank API is running"
    });
});

/* ---------------- API Routes ---------------- */
app.use('/api', routes);

app.use(notFound);

app.use(errorHandler);

export default app;