/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-fragments */
/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
/* eslint-disable no-underscore-dangle */
/* eslint-disable promise/always-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
import React, { useEffect, useState } from 'react';
import {  Button, Grid, TextField } from '@material-ui/core';
import { DataGrid,RowParams } from '@material-ui/data-grid';
import { SearchSyrupByValue, SearchSyrups, SearchTabletByValue, SearchTablets, SearchTubeByValue, SearchTubes } from '../datastore/store';
import { SyrupRow } from '../Types/SyrupRow';
import { TabletRow } from '../Types/TabletRow';
import { TubeRow } from '../Types/TubeRow';
import { useStyles } from './gridStyles';

const Tabletcolumns = [
  { field: 'TabletName', headerName: 'Tablet name', width: 150 },
  { field: 'GenericName', headerName: 'Generic name', width: 150 },
  { field: 'Pathophysiology', headerName: 'Pathophysiology', width: 160 },
  { field: 'TotalPieces', headerName: 'Total Pieces', width: 130 },
  { field: 'PurchasePrice', headerName: 'Purchase Price', width: 130 },
  { field: 'SellingPrice', headerName: 'Selling Price', width: 130 },
];
const Syrupcolumns = [
  { field: 'SyrupName', headerName: 'Syrup name', width: 150 },
  { field: 'GenericName', headerName: 'Generic name', width: 150 },
  { field: 'Pathophysiology', headerName: 'Pathophysiology', width: 160 },
  { field: 'TotalPieces', headerName: 'Total Pieces', width: 130 },
  { field: 'PurchasePrice', headerName: 'Purchase Price', width: 130 },
  { field: 'SellingPrice', headerName: 'Selling Price', width: 130 },
];
const Tubecolumns = [
  { field: 'TubeName', headerName: 'Tube name', width: 150 },
  { field: 'GenericName', headerName: 'Generic name', width: 150 },
  { field: 'Pathophysiology', headerName: 'Pathophysiology', width: 160 },
  { field: 'TotalPieces', headerName: 'Total Pieces', width: 130 },
  { field: 'PurchasePrice', headerName: 'Purchase Price', width: 130 },
  { field: 'SellingPrice', headerName: 'Selling Price', width: 130 },
];
const createSyrupRow = (
  id: string,
  syrupname: string,
  genericname: string,
  pathophysiology: string,
  totalpieces: string,
  purchaseprice: string,
  sellingprice: string
) => {
  const row: SyrupRow = {
    id,
    SyrupName: syrupname,
    GenericName: genericname,
    Pathophysiology: pathophysiology,
    TotalPieces: totalpieces,
    PurchasePrice: purchaseprice,
    SellingPrice: sellingprice,
  };
  return row;
};
const createTabletRow = (
  id: string,
  tabletname: string,
  genericname: string,
  pathophysiology: string,
  totalpieces: string,
  purchaseprice: string,
  sellingprice: string
) => {
  const row: TabletRow = {
    id,
    TabletName: tabletname,
    GenericName: genericname,
    Pathophysiology: pathophysiology,
    TotalPieces: totalpieces,
    PurchasePrice: purchaseprice,
    SellingPrice: sellingprice,
  };
  return row;
};
const createTubeRow = (
  id: string,
  tubename: string,
  genericname: string,
  pathophysiology: string,
  totalpieces: string,
  purchaseprice: string,
  sellingprice: string
) => {
  const row: TubeRow = {
    id,
    TubeName: tubename,
    GenericName: genericname,
    Pathophysiology: pathophysiology,
    TotalPieces: totalpieces,
    PurchasePrice: purchaseprice,
    SellingPrice: sellingprice,
  };
  return row;
};
interface IProps {
  R: any;
  catagory: string;
  deleted: boolean;
  OnresetSucess: () => void;
  onrowSelected: (args: any) => void;
}
function Mtable({ R, catagory, deleted, ...props }: IProps) {
  const classes=useStyles();
  const [TabletRows, setTabletRows] = useState([
    {
      id: '',
      TabletName: '',
      GenericName: '',
      Pathophysiology: '',
      TotalPieces: '',
      PurchasePrice: '',
      SellingPrice: '',
    } as TabletRow,
  ]);
  const [SyrupRows, setSyrupRows] = useState([
    {
      id: '',
      SyrupName: '',
      GenericName: '',
      Pathophysiology: '',
      TotalPieces: '',
      PurchasePrice: '',
      SellingPrice: '',
    } as SyrupRow,
  ]);
  const [TubeRows, setTubeRows] = useState([
    {
      id: '',
      TubeName: '',
      GenericName: '',
      Pathophysiology: '',
      TotalPieces: '',
      PurchasePrice: '',
      SellingPrice: '',
    } as TubeRow,
  ]);
const [name,setname]=useState('');
  const [selectedRow, setSelectedRow] = useState({} as any);
  const filterRows = () => {
    if (selectedRow != null) {
      if (catagory == 'syrup') {
        const deletedrow = createSyrupRow(
          selectedRow.id,
          selectedRow.SyrupName,
          selectedRow.GenericName,
          selectedRow.Pathophysiology,
          selectedRow.TotalPieces,
          selectedRow.PurchasePrice,
          selectedRow.SellingPrice
        );
        const filteredRows = SyrupRows.filter((row) => {
          return row.id != deletedrow.id;
        });
        console.log(filteredRows);
        setSyrupRows([...filteredRows]);
        setSelectedRow(null);
      }
      if (catagory == 'tablet') {
        const deletedrow = createTabletRow(
          selectedRow.id,
          selectedRow.TabletName,
          selectedRow.GenericName,
          selectedRow.Pathophysiology,
          selectedRow.TotalPieces,
          selectedRow.PurchasePrice,
          selectedRow.SellingPrice
        );
        const filteredRows = TabletRows.filter((row) => {
          return row.id != deletedrow.id;
        });
        console.log(filteredRows);
        setTabletRows([...filteredRows]);
        setSelectedRow(null);
      }
      if (catagory == 'tube') {
        const deletedrow = createTubeRow(
          selectedRow.id,
          selectedRow.TubeName,
          selectedRow.GenericName,
          selectedRow.Pathophysiology,
          selectedRow.TotalPieces,
          selectedRow.PurchasePrice,
          selectedRow.SellingPrice
        );
        const filteredRows = TubeRows.filter((row) => {
          return row.id != deletedrow.id;
        });
        console.log(filteredRows);
        setTubeRows([...filteredRows]);
        setSelectedRow(null);
      }
    }
  };
  const handleRowClick = (param: RowParams) => {
    setname('');
    props.onrowSelected(param.row as any);
    setSelectedRow(param.row as any);
  };

  useEffect(() => {
    SearchTablets().then((result) => {
      const rows = result.map((row: any) => {
        return createTabletRow(
          row._id,
          row.TabletName,
          row.GenericName,
          row.Pathophysiology,
          row.TotalPieces,
          row.PurchasePrice,
          row.SellingPrice
        );
      });
      setTabletRows(rows);
    }).catch((err:any)=>{});
    SearchSyrups().then((result) => {
      const rows = result.map((row: any) => {
        return createSyrupRow(
          row._id,
          row.SyrupName,
          row.GenericName,
          row.Pathophysiology,
          row.TotalPieces,
          row.PurchasePrice,
          row.SellingPrice
        );
      });
      setSyrupRows(rows);
    // eslint-disable-next-line prettier/prettier
    }).catch((err:any)=>{});
    SearchTubes().then((result) => {
      const rows = result.map((row: any) => {
        return createTubeRow(
          row._id,
          row.TubeName,
          row.GenericName,
          row.Pathophysiology,
          row.TotalPieces,
          row.PurchasePrice,
          row.SellingPrice
        );
      });
      setTubeRows(rows);
    }).catch((err:any)=>{});
  }, []);

  useEffect(() => {
    if (R != null) {
      if (catagory == 'tablet') {
        const newrow = createTabletRow(
          R.id,
          R.TabletName,
          R.GenericName,
          R.Pathophysiology,
          R.TotalPieces,
          R.PurchasePrice,
          R.SellingPrice
        );
        const existing = TabletRows.filter((row) => {
          return row.id == newrow.id;
        });
        if (existing.length >= 1) {
          console.log();
          const updated: TabletRow[] = [...TabletRows];

          const index = TabletRows.indexOf(existing[0]);
          updated[index] = newrow;
          setTabletRows([...updated]);
        } else {
          setTabletRows([...TabletRows, newrow]);
        }
      }
      if (catagory == 'syrup') {
        const newrow = createSyrupRow(
          R.id,
          R.SyrupName,
          R.GenericName,
          R.Pathophysiology,
          R.TotalPieces,
          R.PurchasePrice,
          R.SellingPrice
        );
        const existing = SyrupRows.filter((row) => {
          return row.id == newrow.id;
        });
        if (existing.length >= 1) {
          console.log();
          const updated: SyrupRow[] = [...SyrupRows];

          const index = SyrupRows.indexOf(existing[0]);
          updated[index] = newrow;
          setSyrupRows([...updated]);
        } else {
          setSyrupRows([...SyrupRows, newrow]);
        }
      }
      if (catagory == 'tube') {
        const newrow = createTubeRow(
          R.id,
          R.TubeName,
          R.GenericName,
          R.Pathophysiology,
          R.TotalPieces,
          R.PurchasePrice,
          R.SellingPrice
        );
        const existing = TubeRows.filter((row) => {
          return row.id == newrow.id;
        });
        if (existing.length >= 1) {
          const updated: TubeRow[] = [...TubeRows];

          const index = TubeRows.indexOf(existing[0]);
          updated[index] = newrow;
          setTubeRows([...updated]);
        } else {
          setTubeRows([...TubeRows, newrow]);
        }
      }
    }
  }, [R]);
  useEffect(() => {
    if (deleted) {
      filterRows();
      props.OnresetSucess();
    } else {
    }
  }, [deleted]);

  function renderTags() {
    if (catagory == 'tablet') {
      return (
          <DataGrid
            className={classes.root}

            rows={TabletRows as any}
            onRowClick={(param: RowParams) => {
              handleRowClick(param);
            }}
            columns={Tabletcolumns}
            pageSize={5}
          />

      );
    }
    if (catagory == 'syrup') {
      return (

          <DataGrid
          className={classes.root}
            rows={SyrupRows as any}
            columns={Syrupcolumns}
            onRowClick={(param: RowParams) => {
              handleRowClick(param);
            }}
            pageSize={5}
          />
      );
    }
    if (catagory == 'tube') {
      return (
          <DataGrid
          className={classes.root}
            rows={TubeRows as any}
            columns={Tubecolumns}
            onRowClick={(param: RowParams) => {
              handleRowClick(param);
            }}
            pageSize={5}
          />
      );
    }
  }
 function handleInputChange(e:any){
   const {value}:{value:string} = e.target;
    setname(value);

 }
 async function find() {
  const rowclasses=document.getElementsByClassName("MuiDataGrid-row");
  for (let index = 0; index < rowclasses.length; index++) {
    const element = rowclasses[index];
    element.classList.remove("Mui-selected");
  }

  if(catagory==="tablet"){
    const tablet=await  SearchTabletByValue(name);
    if(tablet!=null){
      const modified={
        TabletName:tablet.TabletName,
        id:tablet._id,
        GenericName:tablet.GenericName,
        Pathophysiology:tablet.Pathophysiology,
        TotalPieces:tablet.TotalPieces,
        PurchasePrice:tablet.PurchasePrice,
        SellingPrice:tablet.SellingPrice
      }
      setSelectedRow(modified);
      props.onrowSelected(modified);
    }else{
      setSelectedRow(null);
      props.onrowSelected(null);
      props.OnresetSucess();
    }
   }
   if(catagory==="tube"){
    const tube=await  SearchTubeByValue(name);
    if(tube!=null){
      const modified={
        TubeName:tube.TubeName,
        id:tube._id,
        GenericName:tube.GenericName,
        Pathophysiology:tube.Pathophysiology,
        TotalPieces:tube.TotalPieces,
        PurchasePrice:tube.PurchasePrice,
        SellingPrice:tube.SellingPrice
      }
      setSelectedRow(modified);
      props.onrowSelected(modified);
    }else{
      setSelectedRow(null);
      props.onrowSelected(null);
      props.OnresetSucess();
    }
   }
   if(catagory==="syrup"){
    const syrup=await  SearchSyrupByValue(name);
    if(syrup!=null){
      const modified={
        SyrupName:syrup.SyrupName,
        id:syrup._id,
        GenericName:syrup.GenericName,
        Pathophysiology:syrup.Pathophysiology,
        TotalPieces:syrup.TotalPieces,
        PurchasePrice:syrup.PurchasePrice,
        SellingPrice:syrup.SellingPrice
      }
      setSelectedRow(modified);
      props.onrowSelected(modified);
    }else{
      setSelectedRow(null);
      props.onrowSelected(null);
      props.OnresetSucess();
    }
   }
 }
  return(

    <Grid item xs={8} style={{height:"60vh"}}>
      <TextField value={name} type="search" variant="filled" onChange={handleInputChange} fullWidth label="search medicine to update or delete"/>
      <Button
      variant="outlined"
      color="primary"
      fullWidth
      onClick={find}
      >Search</Button>
      {renderTags()}
    </Grid>
  );

}

export default Mtable;
