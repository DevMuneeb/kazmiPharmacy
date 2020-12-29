/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  createStyles,
  makeStyles,
  withStyles,
  Theme,
} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import { Grid, MenuItem, Select } from '@material-ui/core';

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        width:"20ch",
        position:"relative",

      },
    },
    input: {
      borderRadius: 4,
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      width:"170px",
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  })
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),

    },
  })
);

export default function Combobox({ ...props }) {
  const classes = useStyles();
  const [catagory, setcatagory] = React.useState('');
  function handleChange(event: any) {
    setcatagory(event.target.value as string);
    props.onselect(event.target.value);
  }
  return (
    <Grid item>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-select">Catagory</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={catagory}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem selected value="none">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'tablet'}>Tablet</MenuItem>
          <MenuItem value={'syrup'}>Syrup</MenuItem>
          <MenuItem value={'tube'}>Tube</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
}
