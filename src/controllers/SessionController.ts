import { Arg, Mutation, Resolver } from 'type-graphql';
import MongoUser from '../database/schemas/User';
import Auth from '../schemas/Auth';
import { compare } from 'bcryptjs';
import AuthConfig from '../config/auth';
import { sign } from 'jsonwebtoken';

@Resolver(Auth)
class AuthController {
  @Mutation(() => Auth)
  async singIn(@Arg('email') email: string, @Arg('password') password: string) {
    const user = await MongoUser.findOne({
      email,
    });

    if (!user) throw new Error('Incorrect email/password combination.');

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched)
      throw new Error('Incorrect email/password combination.');

    const { secret, expiresIn } = AuthConfig.jwt;

    const token = sign({}, secret, {
      subject: `"${user.id}"`,
      expiresIn,
    });

    return {
      token,
      user,
    };
  }
}

export default AuthController;
