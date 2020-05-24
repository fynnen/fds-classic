import * as React from "react";
import { gql, ApolloError } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { RaidersTable } from "../RaidersTable";
import { ClassEnum } from "../../App";

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
export interface CSLog {
  id: string;
  CS: number;
  reason: string;
  date: string;
  isAdjustment: boolean;
}
export interface Raider {
  id: string;
  name: string;
  totalCS: number;
  class: Class;
  logs?: CSLog[];
}

interface RaidersQueryResult {
  loading: boolean;
  error?: ApolloError | undefined;
  data: Raider[];
}

export interface RaidersListProps {
  currentFilter: ClassEnum;
  currentRaider: string;
  setCurrentRaider: React.Dispatch<React.SetStateAction<string>>;
}

export const RaidersList: React.FC<RaidersListProps> = props => {
  const { currentFilter } = props;
  const { loading, error, data } = useQuery(RAIDERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
    const raiders = data.raiders as Raider[];
  let filteredRaiders;
  if(currentFilter === ClassEnum.All) {
    filteredRaiders = data.raiders;
  } else {
    filteredRaiders = raiders.filter(x => x.class.name === currentFilter);
  }
  

  return <RaidersTable raiders={filteredRaiders} {...props} />;
};
