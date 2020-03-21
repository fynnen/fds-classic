require('dotenv').config();
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { GraphQLError } from 'graphql';
import { Pool } from 'pg';
import { schema } from './app/schema';

export interface IContext {
  pool: Pool,
}

const getContext = (fdsPool: Pool): IContext => {
  return {
    pool: fdsPool,
  };
}

const main = async () => {
  console.log(process.env.PGPORT);
  const fdsPool = new Pool({
    host: process.env.PGHOST,
    port: process.env.PGPORT as number | undefined,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
  });
  const app = express();
  app.use(cors());
  const apolloServer = new ApolloServer({
    schema,
    tracing: true,
    context: () => getContext(fdsPool),
    formatError(error: GraphQLError) {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // logging the errors can help in development
        console.log(error);
      }
      return error;
    },
  });

  apolloServer.applyMiddleware({ app, path: '/graphql' });
  const port = 4000;
  const httpServer = createServer(app);
  httpServer.listen({ port }, () => {
    console.log(`🚀 FDS Classic CS ready at http://localhost:${port}${apolloServer.graphqlPath}`);
    console.log(`🚑 FDS Classic CS healthcheck at http://localhost:${port}/.well-known/apollo/server-health`);
  });
};

main();