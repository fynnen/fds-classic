import { ITypeDefinitions, gql } from 'apollo-server-express';
import { raiderTypeDefs } from './raiders/typeDefs';

const baseTypeDefs = gql`
  type Query
  schema {
    query: Query
  }
`;

export const rootTypeDefs: ITypeDefinitions = [baseTypeDefs, raiderTypeDefs];
