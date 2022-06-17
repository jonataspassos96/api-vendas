import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import FortPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new FortPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.route('/forgot')
  .post(
    celebrate({
      [Segments.BODY]: {
        email: Joi.string().email().required(),
      },
    }),
    forgotPasswordController.create,
  );

passwordRouter.route('/reset')
  .post(
    celebrate({
      [Segments.BODY]: {
        token: Joi.string().uuid().required(),
        password: Joi.string().required(),
        passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
      },
    }),
    resetPasswordController.create,
  );

export default passwordRouter;
