/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable eqeqeq */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-nested-ternary */
/* eslint-disable promise/always-return */

/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-duplicates */
import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import React from 'react';
import { useState } from 'react';

import { useEffect } from 'react';
import { Clear } from '@material-ui/icons';
import Joi from 'joi';
import Btn from './btn';
import { InsertTabletRecord } from '../datastore/store';
import { TabletRow } from '../Types/TabletRow';

interface IProps {
  selectedrow: any;
  reset: boolean;
  onRowReturnedAfterSave: (args: any) => void;
  onSelectedRowUpdated: () => void;
  onFieldsCleared: () => void;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    button: {
      margin: theme.spacing(1),
    },
  })
);
function TabletSpecs({ selectedrow, reset, ...props }: IProps) {
  const classes = useStyles();
  const [Inputs, setInputs] = useState({
    TabletName: '',
    GenericName: '',
    Pathophysiology: '',
    TotalPieces: '',
    PurchasePrice: '',
    SellingPrice: '',
  });
  const [errors, seterrors] = useState({} as any);
  const Schema = Joi.object({
    TabletName: Joi.string().required(),
    GenericName: Joi.string(),
    Pathophysiology: Joi.string(),
    TotalPieces: Joi.number().min(1).required(),
    PurchasePrice: Joi.number().min(1).required(),
    SellingPrice: Joi.number().min(1).required(),
  });
  function validate() {
    const result = Schema.validate(Inputs);
    if (!result.error) return null;
    const errors = {} as any;
    for (const item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  }
  useEffect(() => {
    if (selectedrow != null) {
      if (selectedrow.id) {
        const def = {
          TabletName: selectedrow.TabletName,
          GenericName: selectedrow.GenericName,
          Pathophysiology: selectedrow.Pathophysiology,
          TotalPieces: selectedrow.TotalPieces,
          PurchasePrice: selectedrow.PurchasePrice,
          SellingPrice: selectedrow.SellingPrice,
        };
        setInputs(def);

      }
    }
  }, [selectedrow]);
  useEffect(() => {

      const def = {
        TabletName: '',
        GenericName: '',
        Pathophysiology: '',
        TotalPieces: '',
        PurchasePrice: '',
        SellingPrice: '',
      };
      setInputs(def);


  }, [reset]);
  const handleSucess = (row: any) => {
    const def = {
      TabletName: '',
      GenericName: '',
      Pathophysiology: '',
      TotalPieces: '',
      PurchasePrice: '',
      SellingPrice: '',
    };
    setInputs(def);
    props.onRowReturnedAfterSave(row);
    props.onSelectedRowUpdated();
    props.onFieldsCleared();
  };
  const handleInput = (Event: any) => {
    const { name, value }: { name: string; value: string } = Event.target;
    setInputs((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const renderTags = () => {
    return <Btn title={selectedrow == null ? 'SaveTablet' : 'UpdateTablet'} />;
  };
  function handleSubmit(e: any) {
    e.preventDefault();
    const error = validate();
    if (error) {
      seterrors({ ...error });
    } else {
      seterrors(null);
      dosubmit();
    }
  }
  function dosubmit() {
    InsertTabletRecord(
      selectedrow != null ? { id: selectedrow.id, ...Inputs } : Inputs
    ).then((document) => {
      if (document != null) {
        const row: TabletRow = {
          id: document._id,
          TabletName: document.TabletName,
          GenericName: document.GenericName,
          Pathophysiology: document.Pathophysiology,
          TotalPieces: document.TotalPieces,
          SellingPrice: document.SellingPrice,
          PurchasePrice: document.PurchasePrice,
        };
        handleSucess(row as any);
      } else {
        handleSucess(null);
      }
    }).catch((err:any)=>{});
  }
  return (
    <form
      className={classes.root}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <Grid container
       direction="column"
       spacing={1}
       alignContent="center"
       alignItems="center"
       >
        <Grid item >
          <TextField

            error={errors ? (errors.TabletName ? true : false) : false}
            onInput={handleInput}
            id="filled-basic"
            name="TabletName"
            label="Tablet Name"
            variant="filled"
            value={Inputs.TabletName}
          />
        </Grid>
        <Grid item>
          <TextField

            error={errors ? (errors.GenericName ? true : false) : false}
            onInput={handleInput}
            id="filled-basic"
            name="GenericName"
            label="Generic Name"
            variant="filled"
            value={Inputs.GenericName}
          />
        </Grid>
        <Grid item>
          <TextField

            error={errors ? (errors.Pathophysiology ? true : false) : false}
            onInput={handleInput}
            id="filled-basic"
            name="Pathophysiology"
            label="Pathophysiology"
            variant="filled"
            value={Inputs.Pathophysiology}
          />
        </Grid>

        <Grid item >
          <TextField
            error={errors ? (errors.TotalPieces ? true : false) : false}
            onInput={handleInput}
            type="number"
            id="filled-basic"
            name="TotalPieces"
            label="Total Pieces"
            variant="filled"
            value={Inputs.TotalPieces}
          />
        </Grid>
        <Grid item >
          <TextField
            error={errors ? (errors.PurchasePrice ? true : false) : false}
            onInput={handleInput}
            type="number"
            id="filled-basic"
            name="PurchasePrice"
            label="Purchase Price"
            variant="filled"
            value={Inputs.PurchasePrice}
          />
        </Grid>
        <Grid item >
          <TextField
            error={errors ? (errors.SellingPrice ? true : false) : false}
            onInput={handleInput}
            type="number"
            id="filled-basic"
            name="SellingPrice"
            label="Selling Price"
            variant="filled"
            value={Inputs.SellingPrice}
          />
        </Grid>
        {renderTags()}
        <Grid item  >
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<Clear />}
            type="button"
            onClick={() => {
              const def = {
                TabletName: '',
                GenericName: '',
                Pathophysiology: '',
                TotalPieces: '',
                PurchasePrice: '',
                SellingPrice: '',
              };
              setInputs(def);
              seterrors(null);
              props.onFieldsCleared();
            }}
            disabled={
              Inputs.TabletName ||
              Inputs.GenericName ||
              Inputs.Pathophysiology ||
              Inputs.TotalPieces ||
              Inputs.PurchasePrice ||
              Inputs.SellingPrice
                ? false
                : true
            }
            className={classes.button}
          >
            Clear
          </Button>
          </Grid>

      </Grid>
    </form>
  );
}
export default TabletSpecs;
