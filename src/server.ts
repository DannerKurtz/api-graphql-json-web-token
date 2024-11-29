import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import './database';
import './database/schemas/Tweet';
import './database/schemas/User';
import schemaFn from './schemas';

const app = async () => {
  const schema = await schemaFn();

  const server = new ApolloServer({ schema });

  server.listen().then(({ url }) => {
    console.log(`Server is running at ${url}`);
  });
};

app();
