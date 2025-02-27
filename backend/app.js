import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './db/db.js'
import router from './routes/user.routes.js';
import cookieParser from 'cookie-parser';

connect();
const app = express();
app.use(cors());

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

app.use('/users', router)
app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app;