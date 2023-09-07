import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphqlAuthGuard } from '../auth/guards/graphql-auth-guard.service';
import { Public } from '../auth/guards/public-guard.service';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { GetUsersArgs, User, UserConnection } from './models/user';
import { UsersService } from './users.service';

@UseGuards(GraphqlAuthGuard)
@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  @Public()
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => UserConnection)
  users(@Args() args: GetUsersArgs): Promise<UserConnection> {
    return this.usersService.find(args);
  }

  @Query(() => User, { nullable: true })
  user(@Args('id') id: number): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): string {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
