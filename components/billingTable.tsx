/* eslint-disable no-alert */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-else-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import { DataGrid, RowParams } from '@material-ui/data-grid';
import { green } from '@material-ui/core/colors';
import { Print } from '@material-ui/icons';


const useStyles = makeStyles({
  table: {
    height:"85vh",
    marginTop:"5vh",
    marginRight:"5px"
  },
});

export default function BillingTable({ ...props }) {
  const Tablecolumns = [
    { field: 'desc', headerName: 'desc', width: 150 },
    { field: 'qty', headerName: 'qty', width: 70 },
    { field: 'unit', headerName: 'price per item', width: 150 },
  ];
  const classes = useStyles();
  const [Rows, setRows] = useState(props.rows as any);
  const [selectedRow, setSelectedRow] = useState({} as any);
  function handleRowClick(e: RowParams) {
    setSelectedRow(e.row);
  }
  function handleChange() {
    setSelectedRow(null);
    props.onPrinted(Rows);
  }
  function handleDelete() {
    if (selectedRow != null) {
      const filteredRows = Rows.filter((row: any) => {
        return selectedRow.id != row.id;
      });
      setRows(filteredRows);
      props.selectedRowRemoved(selectedRow);
      setSelectedRow(null);
    } else {
      alert('Select Row to delete ');
    }
  }
  function handleIncrement() {
    if (selectedRow != null) {
      let availableqty = +selectedRow.availableqty;
      if (availableqty - 1 >= 1 && +selectedRow.qty + 1 <= availableqty) {
        let qty = +selectedRow.qty + 1;

        const updated = [...Rows];
        const index = Rows.indexOf(selectedRow);
        const newSelectedrow = {
          id: selectedRow.id,
          desc: selectedRow.desc,
          qty,
          unit: selectedRow.unit,
          availableqty: selectedRow.availableqty,
        };
        updated[index] = newSelectedrow;
        setRows(updated);
        setSelectedRow(newSelectedrow);
      }
    } else {
      alert('select item to increment !');
    }
  }
  function handleDecrement() {
    if (selectedRow != null) {
      let qty = +selectedRow.qty - 1;
      if (qty - 1 >= 0) {
        const updated = [...Rows];
        const index = Rows.indexOf(selectedRow);
        const newSelectedrow = {
          id: selectedRow.id,
          desc: selectedRow.desc,
          qty,
          unit: selectedRow.unit,
          availableqty: selectedRow.availableqty,
        };
        updated[index] = newSelectedrow;
        setRows(updated);
        setSelectedRow(newSelectedrow);
      }
    } else {
      alert('select item to decrement !');
    }
  }
  useEffect(() => {
    setRows(null);
  }, []);
  useEffect(() => {
    if (props.rows) {
      setRows(props.rows);
    } else {
      setRows(null);
    }

    setSelectedRow(null);

  }, [props.rows]);
  function RenderPrint() {
    if (Rows.length >= 1) {
      return (
          <Button
            variant="outlined"
            style={{
              background: green[800],
              color: 'white',
              position: 'absolute',
              bottom: 80,
              right: '30px',
            }}
            startIcon={<Print />}
            onClick={handleChange}
          >
            Print
          </Button>
      );
    } else {
      return '';
    }
  }
  return (
    <>
      <div className={classes.table}>
        <DataGrid
          rows={Rows}
          onRowClick={(param: RowParams) => {
            handleRowClick(param);
          }}
          columns={Tablecolumns}
          pageSize={5}
        />
        <ButtonGroup
          variant="contained"
          style={{
            padding: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position:"absolute",
            bottom:"0"
          }}
          color="primary"
          aria-label="contained primary button group"
        >
          <Button onClick={handleIncrement}>+</Button>
          <Button color={'secondary'} onClick={handleDelete}>
            Remove
          </Button>
          <Button onClick={handleDecrement}>-</Button>
        </ButtonGroup>

      </div>
      {RenderPrint()}
    </>
  );
}
