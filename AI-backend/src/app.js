import express from "express";
import helloRoutes from "./routes/helloRoutes.js";

const app = express();

// Middleware để xử lý JSON request
app.use(express.json());

// Middleware để xử lý URL-encoded request
app.use(express.urlencoded({ extended: true }));    

const routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach(file => {
    if (file.endsWith('.js')) {
        const route = require(path.join(routesPath, file));
        app.use("/api/v1", route);
    }
});


// Lắng nghe trên cổng 3000
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
