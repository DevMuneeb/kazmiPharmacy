/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import { Grid } from '@material-ui/core';

interface IProps {
  title: String;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  })
);

export default function Btn({ title, ...props }: IProps) {
  const classes = useStyles();
  return (
    <Grid item>
      <Button
        variant="contained"
        color="primary"
        size="medium"
        type="submit"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        {title}
      </Button>
    </Grid>
  );
}
