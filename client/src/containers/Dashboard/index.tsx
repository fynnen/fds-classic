import React, { useState } from 'react';
import { RaidersList } from '../../components/RaidersList';
import { RaiderDetails } from '../../components/RaiderDetails';
import { makeStyles, Theme, createStyles, Paper } from '@material-ui/core';
import { ClassEnum } from '../../App';
import styled from 'styled-components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      color: theme.palette.text.secondary,
      padding: theme.spacing(3),
      height: 650,
    },
    card: {
      paddingTop: theme.spacing(3),
      marginTop: 10,
      marginBottom: 10,
      height: 650,
    },
  }),
);

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const Cell = styled.div`
  padding: 12px;
  flex-grow: 0;
  max-width: 50%;
  flex-basis: 50%;
  margin: 0;
  box-sizing: border-box;
`;

interface DashboardProps {
  currentFilter: ClassEnum;
}

export const Dashboard: React.FC<DashboardProps> = (props) => {
  const { currentFilter } = props;
  const [currentRaider, setCurrentRaider] = useState('');
  const classes = useStyles();
  return (
      <Container>
        <Cell>
          <Paper className={classes.card}>
            <RaidersList
              currentFilter={currentFilter}
              currentRaider={currentRaider}
              setCurrentRaider={setCurrentRaider}
            />
          </Paper>
        </Cell>
        <Cell>
          <Paper className={classes.card}>
            <RaiderDetails raiderId={currentRaider} />
          </Paper>
        </Cell>
      </Container>
  );
};
