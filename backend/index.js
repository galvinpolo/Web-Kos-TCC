import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fs from "fs";
import kamarRoute from './routes/kamarRoute.js';
import bayarRoute from './routes/bayarRoute.js';
import userRoute from './routes/userRoute.js';
import db from './config/database.js';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Middleware untuk mengizinkan CORS
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Buat folder uploads jika belum ada
// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir, { recursive: true });
// }

// Serve folder uploads untuk foto kos
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../frontend/assets/uploads"))
);

// Serve folder uploads untuk bukti pembayaran
app.use(
  "/uploads_bukti",
  express.static(path.join(__dirname, "../frontend/assets/uploads_bukti"))
);

console.log(
  "Serving uploads from:",
  path.join(__dirname, "../frontend/assets/uploads")
);

console.log(
  "Serving uploads_bukti from:",
  path.join(__dirname, "../frontend/assets/uploads_bukti")
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(kamarRoute);
app.use(bayarRoute);
app.use(userRoute);

// Koneksi dan Sinkronisasi database
(async () => {
    try {
        await db.sync();
        console.log('Database has been synchronized.');
    } catch (error) {
        console.error('Failed to synchronize database:', error);
    }
})();

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});