/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory, useLocation } from 'react-router-dom';
import { NavigateBefore } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const location=useLocation();

  function handleback() {
    history.goBack();
  }
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Button startIcon={<NavigateBefore style={{color:"white"}} />} onClick={handleback} />

          <Typography variant="h6" className={classes.title}>
            KazmiPharmacy
          </Typography>
          <Typography color="inherit">{location.pathname}</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
