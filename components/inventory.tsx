/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-template */
/* eslint-disable consistent-return */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  createStyles,
  CssBaseline,
  Grid,
  makeStyles,
  Theme,
} from '@material-ui/core';
import WelcomePage from './welcomepage';
import Mtable from './mtable';
import Combobox from './combobox';
import DeleteButton from './deteteButton';
import SyrupSpecs from './syrupspecs';
import TabletSpecs from './tabletspecs';
import TubeSpecs from './tubespecs';
import Container  from '@material-ui/core/Container';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

function Inventory() {
  const classes = useStyles();
  const [rerturnedRow, setReturnedrow] = useState(null);
  const [selectedCatagory, setSelectedCatagory] = useState('');
  const [sucessCode, setSucessCode] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);
  function selectionChanged(catagory: string) {
    setSelectedRow(null);
    setSelectedCatagory(catagory);
  }

  const handleRowReturnedAfterSave = (returnedRow: any) => {
    setReturnedrow(returnedRow);
  };
  function handleDeleteSucess(sucesscode: any) {
    setSucessCode(sucesscode);
    setSelectedRow(null);
  }
  function handleReset() {
    setSucessCode(!sucessCode);
  }
  function handleSelectedRowUpdated() {

  }
  function handleRowSelect(row: any) {
    setSelectedRow(row);
  }
  function handleFieldsCleared() {
    setSelectedRow(null);

  }
  function renderTags() {
    if (selectedCatagory === 'tablet') {
      return (
        <TabletSpecs
          reset={sucessCode}
          onFieldsCleared={handleFieldsCleared}
          onSelectedRowUpdated={handleSelectedRowUpdated}
          selectedrow={selectedRow}
          onRowReturnedAfterSave={handleRowReturnedAfterSave}
        />
      );
    }
    if (selectedCatagory === 'syrup') {
      return (
        <SyrupSpecs
          reset={sucessCode}
          onFieldsCleared={handleFieldsCleared}
          onSelectedRowUpdated={handleSelectedRowUpdated}
          selectedrow={selectedRow}
          onRowReturnedAfterSave={handleRowReturnedAfterSave}
        />
      );
    }
    if (selectedCatagory === 'tube') {
      return (
        <TubeSpecs
          reset={sucessCode}
          onFieldsCleared={handleFieldsCleared}
          onSelectedRowUpdated={handleSelectedRowUpdated}
          selectedrow={selectedRow}
          onRowReturnedAfterSave={handleRowReturnedAfterSave}
        />
      );
    }
    if (selectedCatagory === 'none') {
      return <WelcomePage />;
    }
  }
  useEffect(() => {
    setSelectedCatagory('none');
  }, []);
  return (
    <div style={{height:"100vh",marginTop:"20vh",width:"100vw",overflow:"scroll"}}
    >
    <Combobox onselect={selectionChanged} />
      <Grid
      container
      direction="row"
      spacing={3}
      alignContent="center"
      justify="center"
      >
      {renderTags()}
      { selectedCatagory!=="none" &&<Mtable
          R={rerturnedRow}
          onrowSelected={handleRowSelect}
          catagory={selectedCatagory}
          deleted={sucessCode}
          OnresetSucess={handleReset}

        />}
      </Grid>
        {selectedRow && (
          <DeleteButton
            rowTodelete={selectedRow}
            cat={selectedCatagory}
            onDeleteSucess={handleDeleteSucess}

          />
        )}

    </div>
  );
}

export default Inventory;
