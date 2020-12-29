/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { blue, grey} from '@material-ui/core/colors';
import {
  Button,
  Container,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  })
);

export default function MedicalReport({ ...props }) {
  const classes = useStyles();
  const [Test, setTest] = useState('');
  const [Inputs, setInputs] = useState({
    patientname: '',
    age: '',
    gender: '',
    date: '',
    t3result: '',
    t3normal: '',
    t4result: '',
    t4normal: '',
    tshresult: '',
    tshnormal: '',
  });

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTest(event.target.value as string);
  };
  function handleInput(e: any) {
    const { name, value }: { name: string; value: string } = e.target;
    setInputs((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  function handleSubmit(e: any) {
    e.preventDefault();
    props.history.push({
      pathname: '/printMedicalReport',
      state: {Inputs,Test},
    });
  }
  return (
    <form
      className={classes.root}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      style={{ marginTop: '60px',overflow:"scroll",}}
    >
      <Container
        style={{

          width:"650px",
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: blue[600],
          borderRadius: '1%',
        }}
      >
        <Typography variant="h6" style={{ color: 'white' }}>
          Basic Info
        </Typography>
        <Paper
          style={{
            padding: 5,
            margin: 5,
            background: grey[200],
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextField
            onInput={handleInput}
            value={Inputs.patientname}
            fullWidth
            required
            name="patientname"
            label="Patient Name"
          />
          <TextField
            onInput={handleInput}
            value={Inputs.age}
            required
            type="number"
            name="age"
            label="Age"
          />
          <TextField
            onInput={handleInput}
            value={Inputs.gender}
            label="gender"
            name="gender"
            required
          />
          <TextField
            onInput={handleInput}
            value={Inputs.date}
            label="Date"
            name="date"
            required
            helperText="10-12-2020"
          />
        </Paper>
        <Typography variant="h6" style={{ color: 'white' }}>
          Special chemistry
        </Typography>
        <Container
          style={{
            padding: 5,
            margin: 5,
            background: grey[100],
          }}
          component={Paper}
        >
          <InputLabel id="demo-simple-select-label">
            <Typography variant="h6">TestName</Typography>
          </InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Test}
            onChange={handleChange}
          >
            <MenuItem value="TFT">TFT</MenuItem>
            <MenuItem value="Testosterone">Testosterone</MenuItem>
            <MenuItem value="25OH vit D">25OH vit D</MenuItem>
            <MenuItem value="Estrogen">Estrogen</MenuItem>
            <MenuItem value="Progesterone">Progesterone</MenuItem>
          </Select>
          <TableRow>
            <TableCell>
              <Typography variant="h6">T3 Total</Typography>
            </TableCell>
            <TableCell>
              <TextField
                onInput={handleInput}
                value={Inputs.t3result}
                variant="filled"
                name="t3result"
                label="Result"
              />
            </TableCell>
            <TableCell>
              <TextField
                onInput={handleInput}
                value={Inputs.t3normal}
                variant="filled"
                name="t3normal"
                label="Normal Range"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="h6">T4 Total</Typography>
            </TableCell>
            <TableCell>
              <TextField
                onInput={handleInput}
                value={Inputs.t4result}
                variant="filled"
                name="t4result"
                label="Result"
              />
            </TableCell>
            <TableCell>
              <TextField
                onInput={handleInput}
                value={Inputs.t4normal}
                variant="filled"
                name="t4normal"
                label="Normal Range"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="h6">TSH</Typography>
            </TableCell>
            <TableCell>
              <TextField
                onInput={handleInput}
                value={Inputs.tshresult}
                variant="filled"
                name="tshresult"
                label="Result"
              />
            </TableCell>
            <TableCell>
              <TextField
                onInput={handleInput}
                value={Inputs.tshnormal}
                variant="filled"
                name="tshnormal"
                label="Normal Range"
              />
            </TableCell>
          </TableRow>
        </Container>
        <Button variant="contained" style={{margin:5}} color="secondary" type="submit">
          Print
        </Button>
      </Container>
    </form>
  );
}
