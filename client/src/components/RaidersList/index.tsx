import * as React from "react";
import { gql, ApolloError } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { RaidersTable } from "../RaidersTable";

const RAIDERS = gql`
  query {
    raiders {
      id
      name
      totalCS
      class {
        name
      }
    }
  }
`;

export interface Class {
  id: number;
  name: string;
}

export interface Raider {
  id: string;
  name: string;
  totalCS: number;
  class: Class;
}

interface RaidersQueryResult {
  loading: boolean;
  error?: ApolloError | undefined;
  data: Raider[];
}

export interface RaidersListProps {
  currentRaider: string;
  setCurrentRaider: React.Dispatch<React.SetStateAction<string>>;
}

export const RaidersList: React.FC<RaidersListProps> = props => {
  const { loading, error, data } = useQuery(RAIDERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return <RaidersTable raiders={data.raiders} {...props} />;
};
