import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({ id, name, email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError('UserExists not found.');
    }

    const userExists = await userRepository.findByEmail(email);

    if (userExists && email !== user.email) {
      throw new AppError('There is already one user with this email');
    }

    user.name = name;
    user.email = email;
    user.password = password;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
