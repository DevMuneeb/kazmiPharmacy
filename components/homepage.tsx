/* eslint-disable no-console */
/* eslint-disable import/newline-after-import */
/* eslint-disable react/jsx-fragments */
/* eslint-disable prettier/prettier */
import React from "react";
import {Link, useLocation} from "react-router-dom";
import {Button, Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import { LocalHospital, Storage } from "@material-ui/icons";
import Typography  from '@material-ui/core/Typography';
import { blue, cyan, indigo, purple } from "@material-ui/core/colors";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ReceiptIcon from '@material-ui/icons/Receipt';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
      height:"10vh",
      textAlign:"left"

    },
  }),
);
function Homepage(){
    const classes=useStyles();

    return  (
        <React.Fragment>
            <Container maxWidth="sm" style={{marginTop:"60px"}}>
                  <Link to="/buyingSelling"  style={{ textDecoration: 'none' }}>
                  <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        style={{backgroundColor:indigo[800]}}

                        fullWidth
                        className={classes.button}
                        startIcon={<AttachMoneyIcon style={{fontSize:50}} />}
                    >
                        <Typography variant="h5">
                        Manage Buying / Selling
                        </Typography>
                   </Button>
                  </Link>
                  <Link to="/MedicalReport"  style={{ textDecoration: 'none' }}>
                  <Button
                        variant="contained"
                        style={{backgroundColor:purple[800]}}
                        color="primary"

                        size="large"
                        className={classes.button}
                        startIcon={<LocalHospital style={{ fontSize: 50 }}/>}
                    >
                        <Typography variant="h5">
                            Create Medical Report
                        </Typography>
                   </Button>
                  </Link>
                  <Link to="/inventory"  style={{ textDecoration: 'none' }}>
                  <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        style={{backgroundColor:blue[600]}}

                        fullWidth
                        className={classes.button}
                        startIcon={<Storage style={{ fontSize: 50 }}/>}
                    >
                        <Typography variant="h5" align="left">
                        Manage Inventory
                        </Typography>
                   </Button>
                  </Link>
                  <Link to="/"  style={{ textDecoration: 'none' }}>
                  <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled
                        style={{backgroundColor:cyan[800]}}

                        className={classes.button}
                        startIcon={<ReceiptIcon style={{ fontSize: 50 }}/>}
                    >
                        <Typography variant="h5">
                        Manage Sales Report
                        </Typography>
                   </Button>
                  </Link>

            </Container>
        </React.Fragment>

    );
}

export default Homepage;
