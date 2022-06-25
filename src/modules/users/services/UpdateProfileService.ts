import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}

class UpdateUserService {
  public async execute({ id, name, email, password, oldPassword }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userUpdatedEmail = await userRepository.findByEmail(email);

    if (userUpdatedEmail && userUpdatedEmail.id !== id) {
      throw new AppError('There is already one user with this email');
    }

    if (password && !oldPassword) {
      throw new AppError('Old password is required');
    }

    if (password && oldPassword) {
      const checkOldPassword = await compare(oldPassword, user.password);

      if (!checkOldPassword) {
        throw new AppError(' Old password does not match');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
