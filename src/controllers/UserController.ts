import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import User from '../schemas/User';
import MongoUser from '../database/schemas/User';
import { hash } from 'bcrypt';
@Resolver(User)
class UserController {
  @Query(() => [User], { name: 'users' })
  async find() {
    const users = await MongoUser.find().select([
      '_id',
      'name',
      'email',
      'createAt',
      'updateAt',
    ]);

    return users;
  }

  @Query(() => User, { name: 'user' })
  async findById(@Arg('id') id: string) {
    const user = await MongoUser.findById(id).select([
      '_id',
      'name',
      'email',
      'createAt',
      'updateAt',
    ]);

    if (!user) {
      throw new Error('User does not exists');
    }

    return user;
  }

  @Mutation(() => User, { name: 'createUser' })
  async create(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    const hashedPassword = await hash(password, 10);

    const user = await MongoUser.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default UserController;
