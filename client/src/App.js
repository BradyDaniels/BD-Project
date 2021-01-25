import React, { Fragment } from 'react';
import './App.css';

//Components
import InputPrueba from "./components/InputPrueba";
import ListPruebas from "./components/ListPruebas";

import ListDependencia from "./components/Dependencia/ListDependencia"
import InputDependencia from "./components/Dependencia/InputDependencia"

function App() {
  return (
    <Fragment>
      <div className = "container">
        <InputDependencia/>
        <ListDependencia />
      </div>
    </Fragment>
  )
}

export default App;
