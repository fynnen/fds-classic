import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const GET_RAIDER_DETAIL = gql`
  query raider($raiderId: String!){
    raider(id: $raiderId) {
      id
      name
      totalCS
      class {
        name
      }
      logs {
        id
        CS
        reason
        date
        isAdjustment
      }
    }
  }
`;

interface RaiderDetailsProps {
    raiderId: string;
}

export const RaiderDetails: React.FunctionComponent<RaiderDetailsProps> = props => {
    const { raiderId } = props;
    if(raiderId === '') return <p>Sélectionner un raider</p>;
    return <RaiderDetailsPanel raiderId={raiderId} />
}

export const RaiderDetailsPanel: React.FunctionComponent<RaiderDetailsProps> = props => {
    const { raiderId } = props;
    const { loading, error, data } = useQuery(GET_RAIDER_DETAIL, {
        variables: { raiderId },
      });

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>RIPPPPP ...</p>;
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

