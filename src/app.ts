import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import clientRoutes from './routes/client.routes';
import shoppingDayRoutes from './routes/shoppingDay.routes';
import orderRoutes from './routes/order.routes';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Hortifrutti backend rodando!' });
});

app.use('/clients', clientRoutes);
app.use('/shopping-days', shoppingDayRoutes);
app.use('/orders', orderRoutes);

app.use(errorHandler);

export default app;