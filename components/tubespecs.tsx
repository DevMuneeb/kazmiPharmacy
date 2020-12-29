/* eslint-disable promise/always-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable eqeqeq */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
import { Button, createStyles, Grid, makeStyles, TextField } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import React from "react";
import { useState } from 'react';

import { useEffect } from 'react';
import { Clear } from "@material-ui/icons";
import Joi from "joi";
import Btn from "./btn";
import { InsertTubeRecord } from "../datastore/store";
import { TubeRow } from "../Types/TubeRow";


interface IProps {
    selectedrow:any,
    reset:boolean,
    onRowReturnedAfterSave:(args:any)=>void,
    onSelectedRowUpdated:()=>void
    onFieldsCleared:()=>void
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
  }),
);
function TubeSpecs ({selectedrow,reset,...props}:IProps){
    const classes=useStyles();
    const [Inputs,setInputs]=useState({
        TubeName:"",
        GenericName:"",
        Pathophysiology:"",
        TotalPieces:"",
        PurchasePrice:"",
        SellingPrice:""
    });
    const [errors,seterrors]=useState({} as any) ;
    const Schema=Joi.object({
        TubeName:Joi.string().required(),
        GenericName:Joi.string(),
        Pathophysiology:Joi.string(),
        TotalPieces:Joi.number().min(1).required(),
        PurchasePrice:Joi.number().min(1).required(),
        SellingPrice:Joi.number().min(1).required()
    });
    function validate() {
        const result = Schema.validate(Inputs);
        if(!result.error) return null;
        const errors ={} as any;
        for(const item of result.error.details){
          errors[item.path[0]]=item.message;
        }
        return errors;
    }
    useEffect(()=>{
        if(selectedrow!=null){
            if(selectedrow.id){
                const def={
                    TubeName:selectedrow.TubeName,
                    GenericName:selectedrow.GenericName,
                    Pathophysiology:selectedrow.Pathophysiology,
                    TotalPieces:selectedrow.TotalPieces,
                    PurchasePrice:selectedrow.PurchasePrice,
                    SellingPrice:selectedrow.SellingPrice
                }
                setInputs(def);
            }
        }
    },[selectedrow]);
    useEffect(()=>{

            const def={
                TubeName:"",
                GenericName:"",
                Pathophysiology:"",
                TotalPieces:"",
                PurchasePrice:"",
                SellingPrice:""
            }
            setInputs(def);


    },[reset]);
    const handleSucess=(row:any)=>{
        const def={
            TubeName:"",
            GenericName:"",
            Pathophysiology:"",
            TotalPieces:"",
            PurchasePrice:"",
            SellingPrice:""
        }
        setInputs(def);
        props.onRowReturnedAfterSave(row);
        props.onSelectedRowUpdated();
        props.onFieldsCleared();
    }
    const handleInput=(Event:any)=>{
        const { name, value }: { name: string;value: string }=Event.target;
        setInputs(
            (prev)=>{
                return {
                    ...prev,
                    [name]:value
                }
            }
        );
    }
    const renderTags=()=>{
            return <Btn  title={selectedrow==null?"SaveTube":"UpdateTube"}  />
    }
    function handleSubmit(e:any){
        e.preventDefault();
        const error=validate();
        if(error){
            seterrors({...error});
        }
       else{

        seterrors(null);
        dosubmit();

       }



    }
    function dosubmit(){
        InsertTubeRecord(selectedrow!=null?{id:selectedrow.id,...Inputs}:Inputs)
        .then(document=>{
          if(document!=null){
          const row:TubeRow={
              id:document._id,
              TubeName:document. TubeName,
              GenericName:document.GenericName,
              Pathophysiology:document.Pathophysiology,
              TotalPieces:document.TotalPieces,
              SellingPrice:document.SellingPrice,
              PurchasePrice:document.PurchasePrice
            }
            handleSucess(row as any);
          }else{
            handleSucess(null)
          }
        }).catch((err:any)=>{});
    }
    return(

        <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
            <Grid
             container
             direction="column"
             alignContent="center"
             alignItems="center"
             spacing={1}
            >
                <Grid item >
                    <TextField  error={errors?!!(errors. TubeName):false} onInput={handleInput} id="filled-basic" name="TubeName" label="Tube Name" variant="filled" value={Inputs. TubeName} />
                </Grid>
                <Grid item >
                    <TextField  error={errors?!!(errors.GenericName):false} onInput={handleInput} id="filled-basic" name="GenericName" label="Generic Name" variant="filled" value={Inputs.GenericName} />
                </Grid>
                <Grid item >
                    <TextField  error={errors?!!(errors.Pathophysiology):false} onInput={handleInput} id="filled-basic" name="Pathophysiology" label="Pathophysiology" variant="filled" value={Inputs.Pathophysiology}/>
                </Grid>
                <Grid item >
                    <TextField error={errors?!!(errors.TotalPieces):false} onInput={handleInput} type="number" id="filled-basic" name="TotalPieces" label="Total Pieces" variant="filled" value={Inputs.TotalPieces} />
                </Grid>
                <Grid item >
                    <TextField error={errors?!!(errors.PurchasePrice):false} onInput={handleInput} type="number" id="filled-basic" name="PurchasePrice" label="Purchase Price" variant="filled" value={Inputs.PurchasePrice} />
                </Grid>
                <Grid item
               >
                    <TextField error={errors?!!(errors.SellingPrice):false} onInput={handleInput} type="number" id="filled-basic" name="SellingPrice" label="Selling Price" variant="filled" value={Inputs.SellingPrice}/>
                </Grid>
                {renderTags()}
                <Grid item>
                    <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            startIcon={<Clear/>}
                            type="button"
                            onClick={()=>{
                                const def={
                                    TubeName:"",
                                    GenericName:"",
                                    Pathophysiology:"",
                                    TotalPieces:"",
                                    PurchasePrice:"",
                                    SellingPrice:""
                                }
                                setInputs(def);
                                seterrors(null);
                                props.onFieldsCleared();
                            }}
                            disabled={!(Inputs. TubeName||Inputs.GenericName||Inputs.Pathophysiology||Inputs.TotalPieces||Inputs.PurchasePrice||Inputs.SellingPrice)}
                            className={classes.button}
                    >
                        Clear
                    </Button>
                </Grid>
            </Grid>
            </form>

    );
}
export default TubeSpecs;
