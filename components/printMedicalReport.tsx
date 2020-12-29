/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Container,
  makeStyles,
  Button,
  Typography,
  Grid,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import PrintProvider, { Print, NoPrint } from 'react-easy-print';

const useStyles = makeStyles((theme) => ({
  table: {
    width: '100%',
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: '5px',
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    alignContent:"center",
    position: 'relative',
    bottom: '0px',
    left: '40px',
    width: '85%',
    marginBottom: '8px',
  },
}));

const PrintMedicalReport = ({ ...props }) => {
  const classes = useStyles();
  const [Inputs, SetInputs] = useState({} as any);
  const [Test,setTest]=useState('');

  useEffect(() => {
    if (props.location.state) {
      SetInputs(props.location.state.Inputs);
      setTest(props.location.state.Test);
      console.log(props.location.state.Test);
    }

  }, [props.location.state]);
  return (
    <PrintProvider>
      <NoPrint>
        <Container
          component={Paper}
          style={{
            width: '600px',
            position: 'relative',
            height: '90vh',
            padding: '10px',
            marginTop: '40px',
            overflow:"scroll"
          }}
        >
          <Print single name="foo">
            <Table className={classes.table}>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Patient Name</Typography>
                </TableCell>
                <TableCell>{Inputs.patientname}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Gender</Typography>
                </TableCell>
                <TableCell>{Inputs.gender}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Age</Typography>
                </TableCell>
                <TableCell>{Inputs.age}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Date</Typography>
                </TableCell>
                <TableCell>{Inputs.date}</TableCell>
              </TableRow>
            </Table>
            <Grid item xs={12}>
              <Typography variant="h5" component="h5">Special Chemistry</Typography>
            </Grid>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6" component="h6">Test Name</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="h6" component="h6">Result</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" component="h6">Normal Range</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <Typography variant="h6">
                {Test}
                {/* {Inputs.testname} */}
              </Typography>
              <TableRow>
                <TableCell>T3 Total</TableCell>
                <TableCell align="left">{Inputs.t3result}</TableCell>
                <TableCell>{Inputs.t3normal}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>T4 Total</TableCell>
                <TableCell>{Inputs.t4result}</TableCell>
                <TableCell>{Inputs.t4normal}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>TSH</TableCell>
                <TableCell>{Inputs.tshresult}</TableCell>
                <TableCell>{Inputs.tshnormal}</TableCell>
              </TableRow>
            </Table>
            <footer className={classes.footer}>
              <Container  maxWidth="sm">

                <Typography variant="body2">
                  <b>Ph.</b>03008352213 <b>Email.</b>najaftehseen2@gmail.com
                </Typography>
                <Typography variant="body1">
                  This Report is not valid for court use
                </Typography>
                <Typography>
                <div style={{display:"inline"}}>
                <b>Kazmi Pharmacy </b>main road Domel
                </div>
                </Typography>

              </Container>
            </footer>
          </Print>
          <Button
            style={{ marginTop: '10px' }}
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => window.print()}
          >
            Print
          </Button>
        </Container>
      </NoPrint>
    </PrintProvider>
  );
};
export default PrintMedicalReport;
