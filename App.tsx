/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-fragments */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import buyingSelling from './components/buyingSelling';
import Header from './components/header';
import Homepage from './components/homepage';
import Inventory from './components/inventory';
import MedicalReport from './components/medicalReport';
import PrintComponent from './components/printComponent';
import PrintMedicalReport from './components/printMedicalReport';

export default function App() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Switch>
          <Route path="/print" exact component={PrintComponent} />
          <Route path="/buyingSelling" exact component={buyingSelling} />
          <Route path="/inventory" exact component={Inventory} />
          <Route path="/printMedicalReport" exact component={PrintMedicalReport} />
          <Route path="/MedicalReport" exact component={MedicalReport} />
          <Route path="/homepage" exact  component={Homepage} />
          <Redirect from="/" to="/homepage" />
        </Switch>
      </main>
    </React.Fragment>
  );
}
