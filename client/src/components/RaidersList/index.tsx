import * as React from "react";
import { gql, ApolloError } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import { ClassIcon } from "../ClassIcon";

const RAIDERS = gql`
  query {
    raiders {
      name
      totalCS
      class {
        name
      }
    }
  }
`;

interface Class {
  id: number;
  name: string;
}

interface Raider {
  name: string;
  totalCS: number;
  class: Class;
}

interface RaidersQueryResult {
  loading: boolean;
  error?: ApolloError | undefined;
  data: Raider[];
}

export const RaidersList: React.FC<any> = props => {
  const { loading, error, data } = useQuery(RAIDERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);
  return (
  <table style={{borderCollapse:'collapse', width: '100%'}}>
    <Row>
      <th>Raider</th>
      <th>Classe</th>
      <th>Total CS</th>
    </Row>
    {data.raiders.map((x: Raider) => <RaiderRow raider={x}/>)}
  </table>
  );
};

interface RaiderRowProps {
  raider: Raider;
}

const Row = styled.tr`
  border-bottom-color: rgb(240, 243, 255);
  border-bottom-style: solid;
  border-bottom-width: 2px;
`;

const RaiderRow: React.FC<RaiderRowProps> = props => {
  const { raider } = props;
  return (
    <>
      <Row>
        <td>{raider.name}</td>
        <td><span><ClassIcon class={raider.class.name}/></span>{raider.class.name}</td>
        <td>{raider.totalCS}</td>
      </Row>
    </>
  );
};