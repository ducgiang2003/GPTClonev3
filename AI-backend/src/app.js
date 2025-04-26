import express from "express";
import helloRoutes from "./routes/helloRoutes.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const routesPath = path.join(__dirname, "routes");
fs.readdirSync(routesPath).forEach((file) => {
    if (file.endsWith(".js")) {
        import(path.join(routesPath, file))
            .then((module) => {
                app.use("/api/v1", module.default); // Ensure routes are properly exported as default
            })
            .catch((err) => {
                console.error(`Failed to load route: ${file}`, err);
            });
    }
});

// Listen on port 3001
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
