/* eslint-disable no-empty */
/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable eqeqeq */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { DataGrid, RowParams} from '@material-ui/data-grid';
import { useState , useEffect } from 'react';
import { SearchTablets, SearchSyrups, SearchTubes } from '../datastore/store';
import { useStyles } from './gridStyles';



export default function ItemsTable({...props}) {
  const classes=useStyles();
    const Tablecolumns = [
        { field: 'Catagory', headerName: 'Type', width: 70 },
        { field: 'MedicineName', headerName: 'Name', width: 100 },
        { field: 'GenericName', headerName: 'Generic', width: 150 },
        { field: 'Pathophysiology', headerName: 'Pathophysiology', width: 150 },
        { field: 'Quantity', headerName: 'Qty', width: 60 },
        { field: 'Price', headerName: 'Price', width: 70 },
      ];
      const [Rows,setRows]=useState([] as any );
      const[originalRows,setOriginalRows]=useState([] as any);
      const handleRowClick=(param:RowParams)=>{
        props.onrowSelected(param.row);
      }
      useEffect(()=>{
        async function getRows() {
          try{
            const tabletsRows=await SearchTablets();
            const syrups=await SearchSyrups();
            const tubes=await SearchTubes();
            const concatedRows=tabletsRows.concat(syrups,tubes);
            const ArrangedRows=concatedRows.map((row:any)=>{
              let cat="";
              if(row.TabletName){
                cat="tablet";
                return {
                  id:row._id,
                  Catagory:cat,
                  MedicineName:row.TabletName,
                  GenericName:row.GenericName,
                  Pathophysiology:row.Pathophysiology,
                  Quantity:row.TotalPieces,
                  Price:row.SellingPrice
                }
              }
              if(row.SyrupName){
                cat="syrup";
                return {
                  id:row._id,
                  Catagory:cat,
                  MedicineName:row.SyrupName,
                  GenericName:row.GenericName,
                  Pathophysiology:row.Pathophysiology,
                  Quantity:row.TotalPieces,
                  Price:row.SellingPrice
                }
              }
              if(row.TubeName){
                cat="tube"
                return {
                  id:row._id,
                  Catagory:cat,
                  MedicineName:row.TubeName,
                  GenericName:row.GenericName,
                  Pathophysiology:row.Pathophysiology,
                  Quantity:row.TotalPieces,
                  Price:row.SellingPrice
                }
              }

            });
            setRows(ArrangedRows);
            setOriginalRows(ArrangedRows);
          }catch(exp){

          }

        }

        getRows();
     },[]);
useEffect(()=>{

  if(props.medicinename!=""){
   const filteredRows=Rows.filter((row:any)=>{
     const Mname:string=row.MedicineName;
     return Mname.match(props.medicinename);

   });
   setRows(filteredRows);
  }else{
    setRows(originalRows);
  }
},[props.medicinename])
  return (
    <div style={{ height:"70vh" }}>
      <DataGrid className={classes.root} rows={Rows} onRowClick={(param: RowParams) => {handleRowClick(param)}} columns={Tablecolumns} pageSize={6}  />
    </div>
  );
}
