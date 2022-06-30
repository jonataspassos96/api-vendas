import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(isAuthenticated);

ordersRouter.route('/')
  .post(
    celebrate({
      [Segments.BODY]: {
        customerId: Joi.string().uuid().required(),
        products: Joi.array().items(Joi.object({
          id: Joi.string().uuid().required(),
          quantity: Joi.number().required(),
        })),
      },
    }),
    ordersController.create,
  );

ordersRouter.route('/:id')
  .get(
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    ordersController.show,
  );

export default ordersRouter;
