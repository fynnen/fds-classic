import { makeExecutableSchema } from 'apollo-server-express';
import { resolverMaps } from './resolvers';
import { rootTypeDefs } from './rootTypeDefs';

export const schema = makeExecutableSchema({
  resolvers: resolverMaps,
  typeDefs: rootTypeDefs,
});
