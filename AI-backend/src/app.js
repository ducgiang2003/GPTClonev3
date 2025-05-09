import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath, pathToFileURL  } from "url";
import cors from "cors";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000', // Cho phép yêu cầu từ ứng dụng Next.js
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


const routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach((file) => {
  if (file.endsWith('.js')) {
    const routePath = pathToFileURL(path.join(routesPath, file));

    import(routePath.href)  
      .then((module) => {
        app.use('/api/v1', module.default);  
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
