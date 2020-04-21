import React from 'react';
import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flex: '1 1 100%',
    },
  }),
);

interface TableToolbarProps {
  title: string;
}

export const TableToolbar: React.FC<TableToolbarProps> = (props) => {
  const classes = useToolbarStyles();
  const { title } = props;
  return (
    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
      {title}
    </Typography>
  );
};
