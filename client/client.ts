import express, { Express } from 'express';

const app: Express = express();

app.use(express.json());

const port: number | string = process.env.PORT || 8080;

app.listen(port, async () => {
    await console.log('Server listening on port ' + port);
})

export default app;