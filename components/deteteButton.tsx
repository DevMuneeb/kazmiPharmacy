/* eslint-disable eqeqeq */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable prettier/prettier */
import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { DeleteTablet, DeleteSyrup, DeleteTube } from '../datastore/store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

export default function DeleteButton({ ...props }) {
  const classes = useStyles();
  function handledelete() {
    if (props.rowTodelete != null) {
      if (props.cat == 'tablet') {
        DeleteTablet(props.rowTodelete.id).then((document) => {
          props.onDeleteSucess(document);
        });
      }
      if (props.cat == 'syrup') {
        DeleteSyrup(props.rowTodelete.id).then((document) => {
          props.onDeleteSucess(document);
        });
      }
      if (props.cat == 'tube') {
        DeleteTube(props.rowTodelete.id).then((document) => {
          props.onDeleteSucess(document);
        });
      }
    }
  }
  return (
    <div className="deletebtn" style={{position:"absolute",bottom:0,left:"50%"}}>
      <IconButton
        aria-label="delete"
        onClick={handledelete}
        className={classes.margin}
      >
        <DeleteIcon fontSize="large" />
      </IconButton>
    </div>
  );
}
