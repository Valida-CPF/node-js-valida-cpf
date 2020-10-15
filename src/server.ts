import express from 'express';
import routes from './routes';
import path from 'path';

const app = express();

app.use(express.json());
app.use(routes);

app.use('/downloads', express.static(path.resolve(__dirname, '../downloads')));

app.listen(3333);