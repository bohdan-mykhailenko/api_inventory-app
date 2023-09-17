import express from 'express';
import cors from 'cors';
import createSocketServer from './socketServer';
import { router as OrderRoutes } from './routes/orders.routes';
import { router as ProductRoutes } from './routes/products.routes';
import { initDB } from './database/initDB';

const PORT = process.env.PORT || 5000;

const app = express();

const { server } = createSocketServer(app);

initDB();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/orders', OrderRoutes);
app.use('/products', ProductRoutes);

server.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});
