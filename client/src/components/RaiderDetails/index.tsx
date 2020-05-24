import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Raider } from "../RaidersList";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  TableContainer,
} from "@material-ui/core";
import styled from "styled-components";

const GET_RAIDER_DETAIL = gql`
  query raider($raiderId: String!) {
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

export const RaiderDetails: React.FunctionComponent<RaiderDetailsProps> = (
  props
) => {
  const { raiderId } = props;
  if (raiderId === "") return <p>Sélectionner un raider</p>;
  return <RaiderDetailsPanel raiderId={raiderId} />;
};

export const RaiderDetailsPanel: React.FunctionComponent<RaiderDetailsProps> = (
  props
) => {
  const { raiderId } = props;
  const { loading, error, data } = useQuery(GET_RAIDER_DETAIL, {
    variables: { raiderId },
  });
  console.log(raiderId, data);
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>RIPPPPP ...</p>;
  return <RaiderLogsTable raider={data.raider} />;
};

interface RaiderLogsProps {
  raider: Raider;
}
const useStyles = makeStyles({
  table: {
    width: "100%",
  },
  container: {
    height: 'calc(85% - 24px)',
  },
});

const Header = styled.div`
  height: 15%;
`;

export const RaiderLogsTable: React.FunctionComponent<RaiderLogsProps> = (
  props
) => {
  const classes = useStyles();
  const { raider } = props;
  const { logs } = raider;
  if (!logs || logs.length === 0) return <p>Aucuns logs de CS</p>;
  return (
    <>
      <Header>
        <h1>{raider.name}</h1>
        <label>Historique des CS</label>
      </Header>
      <TableContainer className={classes.container}>
        <Table
          stickyHeader
          size="small"
          className={classes.table}
          aria-label="Liste des raiders"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">CS</TableCell>
              <TableCell align="center">Raison</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => (
              <TableRow hover key={log.id}>
                <TableCell align="center" component="th" scope="row">
                  {log.CS}
                </TableCell>
                <TableCell align="center">{log.reason}</TableCell>
                <TableCell align="center">{log.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
