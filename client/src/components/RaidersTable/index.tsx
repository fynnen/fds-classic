import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Raider, RaidersListProps } from '../RaidersList';
import { ClassIcon } from '../ClassIcon';
import { TableContainer } from '@material-ui/core';
import styled from 'styled-components';
import { TableToolbar } from './TableToolbar';

const useStyles = makeStyles({
  table: {
    width: "100%",
  },  
  root: {
    width: 650,
  },
  container: {
    height: 'calc(95% - 24px)',
  },
});

const Header = styled.div`
  height: 5%;
`;

export interface RaidersTableProps extends RaidersListProps {
    raiders: Raider[];
    selectedRaider?: string;
}

export const RaidersTable: React.FC<RaidersTableProps> = props => {
  const classes = useStyles();
  const { raiders, setCurrentRaider, currentRaider } = props;

  return (
    <>
     
    <TableToolbar title="Liste des raiders" />
    <TableContainer className={classes.container}>
      <Table stickyHeader size="small" className={classes.table} aria-label="Liste des raiders">
        <TableHead>
          <TableRow>
            <TableCell align="center">Raider</TableCell>
            <TableCell align="center">Rang</TableCell>
            <TableCell align="center">Classe</TableCell>
            <TableCell align="center">CS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {raiders.map((raider) => (
            <TableRow hover key={raider.name} onClick={() => setCurrentRaider(raider.id)} selected={raider.id === currentRaider}>
              <TableCell align="center" component="th" scope="row">
                {raider.name}
              </TableCell>
              <TableCell align="center">N/A</TableCell>
              <TableCell align="center"><span><ClassIcon class={raider.class.name}/></span>{raider.class.name}</TableCell>
              <TableCell align="center">{raider.totalCS}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      </>
  );
}