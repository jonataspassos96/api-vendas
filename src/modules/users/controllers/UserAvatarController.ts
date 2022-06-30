import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

class UserAvatarController {
  public async update(req: Request, res: Response) {
    const updateAvatar = new UpdateUserAvatarService();

    const user = await updateAvatar.execute({
      userId: req.user.id,
      avatarFilename: req.file?.filename as string,
    });

    return res.json(instanceToInstance(user));
  }
}

export default UserAvatarController;
