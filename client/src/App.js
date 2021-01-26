import React, { Fragment } from 'react';
import './App.css';

//Components
import InputPrueba from "./components/InputPrueba";
import ListPruebas from "./components/ListPruebas";

import ListDependencia from "./components/Dependencia/ListDependencia";
import InputDependencia from "./components/Dependencia/InputDependencia";

import ListLinea from "./components/LineadeSuministro/ListLinea";
import InputLinea from "./components/LineadeSuministro/InputLinea";


function App() {
  return (
    <Fragment>
      <div className = "container">
        <InputLinea />
        <ListLinea />
      </div>
    </Fragment>
  )
}

export default App;
