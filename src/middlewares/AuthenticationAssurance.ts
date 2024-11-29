import { verify } from 'jsonwebtoken';
import { AuthChecker, ResolverData } from 'type-graphql';
import AuthConfig from '../config/auth';

interface Context {
  token?: string;
}

const AuthenticationAssurance: AuthChecker<Context> = (
  context: ResolverData<Context>
): boolean => {
  const authHeader = context.context.token;
  if (!authHeader) return false;

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, AuthConfig.jwt.secret);

    return !!decoded;
  } catch {
    return false;
  }
};

export default AuthenticationAssurance;
