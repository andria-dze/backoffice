import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @IsNotEmpty()
  password!: string;

  @Field()
  @IsNotEmpty()
  confirmPassword!: string;

  @Field()
  @IsNotEmpty()
  firstName!: string;

  @Field()
  @IsNotEmpty()
  lastName!: string;
}
