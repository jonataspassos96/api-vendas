import 'reflect-metadata';
import express, {
  NextFunction,
  Request,
  Response,
} from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import routes from './routes';
import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use('/files', express.static(uploadConfig.directory));
app.use(errors());

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
});

app.listen(3333, () => console.log('Server started on port 3333'));
