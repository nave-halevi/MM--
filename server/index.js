import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());

// להגיש קבצים סטטיים (CSS, JS, Images)
app.use(express.static(path.join(__dirname, "../client")));

// GET "/" מחזיר את ה-HTML הראשי
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});