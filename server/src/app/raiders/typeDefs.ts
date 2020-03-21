import { gql } from 'apollo-server-express';

export const raiderTypeDefs = gql`
  type Raider {
    id: String!
    name: String!
    totalCS: Int!
    class: Class!
    logs: [CSLog!]!
  }

  type CSLog {
    id: String!
    raider: Raider!
    CS: Int!
    reason: String
    date: String
    isAdjustment: Boolean
  }

  type Class {
    name: String!
  }

  extend type Query {
    raiders: [Raider!]!
    raider(id: String!): Raider
    logs(raiderId: String!): [CSLog!]!
  }
`;
