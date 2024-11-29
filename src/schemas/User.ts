import { IUser } from '../database/schemas/User';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
class User implements IUser {
  @Field(() => ID)
  _id?: string;

  @Field({ nullable: true })
  name!: string;

  @Field({ nullable: true })
  email!: string;

  @Field({ nullable: true })
  password!: string;

  @Field({ nullable: true })
  createAt?: Date;

  @Field({ nullable: true })
  updateAt?: Date;
}

export default User;
