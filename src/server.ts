import express from 'express';
import cors from 'cors';
import createSocketServer from './socketServer';
import orderRoutes from './routes/orders.routes';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

const { server } = createSocketServer(app);

app.use('/api', orderRoutes);

server.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});
