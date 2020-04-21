import { makeStyles, Tabs, Paper, Tab } from "@material-ui/core";
import { ClassEnum } from "../../App";
import React from "react";

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
  });
  
  interface FilterTabProps {
    currentFilter: string;
    setFilter: (id: ClassEnum) => void;
  }
  
  export const ClassesTabs:React.FC<FilterTabProps> = props => {
    const classes = useStyles();
    const { currentFilter, setFilter } = props;
    const handleChange = (event: React.ChangeEvent<{}>, newValue: ClassEnum) => {
      setFilter(newValue);
    };
  
    return (
      <Paper className={classes.root}>
        <Tabs
          value={currentFilter}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab value={ClassEnum.All} label="Tous" />
          <Tab value={ClassEnum.Druid} label="Druid" />
          <Tab value={ClassEnum.Hunter} label="Hunter" />
          <Tab value={ClassEnum.Mage} label="Mage" />
          <Tab value={ClassEnum.Priest} label="Priest" />
          <Tab value={ClassEnum.Rogue} label="Rogue" />
          <Tab value={ClassEnum.Shaman} label="Shaman" />
          <Tab value={ClassEnum.Warlock} label="Warlock" />
          <Tab value={ClassEnum.Warrior} label="Warrior" />
        </Tabs>
      </Paper>
    );
  }
  