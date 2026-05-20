import express from 'express';

const app = express();

//receber json no bodydas req
app.use(express.json());


app.get('/health', (req, res) => {
    res.json({status: 'ok', message: 'HortiCurti back fumando'});
});

export default app;

