import express from 'express';
import category_suppliesRoutes from './routes/category_supplies.routes.js';
import suppliesRoutes from '../src/routes/supplies.routes.js'
import cors from 'cors';
const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(category_suppliesRoutes);
app.use(suppliesRoutes);
console.log(category_suppliesRoutes);

export default app;