import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import CreateSessionsService from '../services/CreateSessionsService';

class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createSessison = new CreateSessionsService();

    const user = await createSessison.execute({ email, password });

    return res.json(instanceToInstance(user));
  }
}

export default SessionsController;
