import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate } from '../../common/paginate/paginate';
import { hashInput } from '../../common/utils/bcrypt';
import { UserEntity } from './entities/user.entity';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { GetUsersArgs, UserConnection } from './models/user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
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

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async find(args: GetUsersArgs): Promise<UserConnection> {
    const qb = this.usersRepository.createQueryBuilder();
    return await paginate(qb, args);
  }

  findOne(id: number): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ email });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user - updateUserInput ${updateUserInput}`;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
