/* eslint-disable no-console */
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';
import router from './app/routers';

dotenv.config();

const { PORT } = process.env;

const app = express();
app.use(morgan('dev'));

app.use(
    cors({
        credentials: true,
    })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.resolve('./public')));
app.use('/public', express.static(path.resolve('./public')));
app.use((err: any, req: any, res: any, next: any) => {
    console.error('Server error:', err);
    res.status(500).json({
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'production' ? undefined : err.message,
    });
});

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}/`);
});

app.use('/', router());
