import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashInput } from '../../infra/utils/bcrypt';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    if (createUserInput.password !== createUserInput.confirmPassword) {
      throw new BadRequestException(`passwords don't match`);
    }
    const hashedPassword = await hashInput(createUserInput.password);
    const newUser = await this.usersRepository.save({
      email: createUserInput.email,
      firstName: createUserInput.firstName,
      lastName: createUserInput.lastName,
      password: hashedPassword,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...response } = newUser;

    return response;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user - updateUserInput ${updateUserInput}`;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
