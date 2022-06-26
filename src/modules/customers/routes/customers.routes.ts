import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import CustomersController from '../controllers/CustomersController';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.use(isAuthenticated);

customersRouter.route('/')
  .get(customersController.list)
  .post(
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
      },
    }),
    customersController.create,
  );

customersRouter.route('/:id')
  .get(
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    customersController.show,
  )
  .put(
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
      },
    }),
    customersController.update,
  )
  .delete(
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    customersController.delete,
  );

export default customersRouter;
