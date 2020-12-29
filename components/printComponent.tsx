/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Container, makeStyles, Button } from '@material-ui/core';
import  React, { useState , useEffect }  from 'react';

import PrintProvider, { Print, NoPrint } from 'react-easy-print';
import { PrintRounded } from '@material-ui/icons';

const useStyles = makeStyles({
    table: {
      width: "500px",
    },
  });
const PrintComponent=({...props}) => {
    const classes=useStyles();
    const [Rows,setRows]=useState([] as any);
    function getSum(qty:string,unit:string){

        const sum=(+qty)*(+unit);
        return sum;
    }
    function getTotal(){
        let sum=0;
        Rows.forEach((row:any) => {
            sum+=(+row.qty)*(+row.unit);
        });
        return sum;
    }
useEffect(()=>{
  try{
    if(props.location.state){
      setRows(props.location.state);
  }
  }catch(exp){}

},[props.location.state]);
return (
<div style={{height:"100vh",width:"100vw",overflow:"scroll",marginTop:"20vh",marginBottom:"20vh"}} >
<Button
    style={{position:"fixed",bottom:"30px",right:"50px",width:"200px"}}
    variant="contained"
    color="primary"
    startIcon={<PrintRounded/>}
    onClick={()=>window.print()}
     />
<PrintProvider  >
  <NoPrint  >
    <Print single name="foo">
    <TableContainer component={Paper} >
      <Table style={{width:"50vw",margin:"auto"}} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Rows.map((row:any) => (
            <TableRow key={row.id}>
              <TableCell>{row.desc}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{getSum(row.qty,row.unit)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{getTotal()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{getTotal()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Print>

  </NoPrint>
</PrintProvider>
  </div>

)};
export default PrintComponent;
