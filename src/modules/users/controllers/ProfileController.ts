import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const showUser = new ShowProfileService();

    const user = await showUser.execute({ id });

    return res.json(instanceToInstance(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email, password, oldPassword } = req.body;
    const { id } = req.user;

    const updateUser = new UpdateProfileService();

    const user = await updateUser.execute({
      id,
      name,
      email,
      password,
      oldPassword,
    });

    return res.json(instanceToInstance(user));
  }
}

export default ProfileController;
