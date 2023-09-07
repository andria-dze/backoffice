import { ArgsType, Field, ID, ObjectType } from '@nestjs/graphql';
import { Connection, ConnectionArgs } from '../../../common/inputs/connection';

@ObjectType()
export class User {
  @Field(() => ID)
  id!: number;

  @Field(() => String)
  firstName!: string;

  @Field(() => String)
  lastName!: string;

  @Field(() => String)
  email!: string;
}

@ObjectType()
export class UserConnection extends Connection(User) {}

@ArgsType()
export class GetUsersArgs extends ConnectionArgs {}
