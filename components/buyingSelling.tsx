/* eslint-disable no-empty */
/* eslint-disable eqeqeq */
/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  Grid,
  makeStyles,
  Paper,
  TextField,
} from '@material-ui/core';
import ItemsTable from './itemsTable';
import BillingTable from './billingTable';
import { updateSyrupQty, updateTabletQty, updateTubeQty } from '../datastore/store';


// import prompt from 'electron-prompt';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',

  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  gridstyle: {},
}));

function BuyingSelling({...props}) {
  const classes = useStyles();
  const [selectedRows, setSelectedRows] = useState([] as any);
  const [medicineName, setMedicineName] = useState('');
  function handleInventoryUpdation(rows: any) {
    rows.forEach((row: any) => {
      const cat: string = row.desc;
      if (cat.includes('tablet')) {

        updateTabletQty(row).then((value: any) => {
        }).catch((err:any)=>{});
      }
      if (cat.includes('syrup')) {
        updateSyrupQty(row).then((value: any) => {
          console.log(value);
        }).catch((err:any)=>{});
      }
      if (cat.includes('tube')) {
        updateTubeQty(row).then((value: any) => {
        }).catch((err:any)=>{});
      }
    });
    try{
      props.history.push({
        pathname: '/print',
        state: rows
      });
    }catch(exp){}

  }
  function handleRowSelect(row: any) {
    const exists=selectedRows.filter((rw:any)=>{
      return rw.id==row.id;
    });
    if(exists.length==0){
    if (+row.Quantity > 0 ) {
      const qty = 1;
      if (qty != null) {
        row.PurchasingQuantity = qty;
        const newrow = {
          id: row.id,
          desc: `${row.MedicineName} (${row.Catagory})`,
          qty,
          unit: row.Price,
          availableqty: row.Quantity,
        };
        const concatedRows = selectedRows.concat(newrow);
        setSelectedRows(concatedRows);
      }
    } else {
      alert('out of quantity');
    }
  }else{
    alert('already added !');
  }
  }
  function onselectedRowRemoved(row: any) {
    const filteredRows = selectedRows.filter((r: any) => {
      return r.id != row.id;
    });
    setSelectedRows(filteredRows);
  }
  function handleInput(e: any) {
    setMedicineName(e.target.value);
  }

  return (
    <div className={classes.root} style={{ height:"100vh",marginTop: '10vh',width:"100vw",overflow:"scroll" }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Paper className={classes.paper} style={{height:"80vh",marginTop:"5vh"}}>
            <TextField
              onChange={handleInput}
              style={{ marginBottom: '10px' }}
              label="Medicine's name"
              fullWidth
              type="search"
            />
            <ItemsTable
              medicinename={medicineName}
              onrowSelected={handleRowSelect}
            />
          </Paper>
        </Grid>
        <Grid item xs={4} className={classes.gridstyle}>
          <BillingTable
            rows={selectedRows}
            selectedRowRemoved={onselectedRowRemoved}
            onPrinted={handleInventoryUpdation}
          />
        </Grid>
      </Grid>
    </div>
  );
}
export default BuyingSelling;
