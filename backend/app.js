import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { errors } from 'celebrate';
import { constants } from 'http2';
import { userRouter } from './routes/users.js';
import { cardRouter } from './routes/cards.js';
import { createUser, login } from './controllers/users.js';
import { auth } from './middlewares/auth.js';
import { NotFoundError } from './errors/NotFoundError.js';
import { userBodyValid, loginValid } from './validators/validators.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';

dotenv.config();
const config = dotenv.config({ path: path.resolve(process.env.NODE_ENV === 'production' ? '.env' : '.env.common') }).parsed;
// подключаемся к серверу mongo
const app = express();

app.use(cors({
  origin: '*',
  allowedHeaders: [
    'Content-Type',
    'Authorization',
  ],
}));

app.use(bodyParser.json());
// валидация mongo

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', userBodyValid, createUser);
app.post('/signin', loginValid, login);

app.use(auth);

app.use('/', userRouter);
app.use('/', cardRouter);

app.all('/*', (req, res, next) => {
  next(new NotFoundError('Страница не существует'));
});

// Общий обработчик ошибок
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const status = err.statusCode || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  const message = err.message || 'Неизвестная ошибка';
  res.status(status).send({ message });
  next();
});

app.listen(config.PORT, () => {
  console.log(`App listening on port ${config.PORT}`);
});
