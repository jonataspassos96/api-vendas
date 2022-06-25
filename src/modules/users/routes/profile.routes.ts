import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.route('/')
  .get(
    isAuthenticated,
    profileController.show,
  )
  .put(
    isAuthenticated,
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        oldPassword: Joi.string(),
        password: Joi.string().optional(),
        passwordConfirmation: Joi.string()
          .valid(Joi.ref('password'))
          .when('password', {
            is: Joi.exist(),
            then: Joi.required(),
          }),
      },
    }),
    profileController.update,
  );

export default profileRouter;
