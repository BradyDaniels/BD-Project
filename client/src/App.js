import React, { Fragment } from 'react';
import './App.css';

//Components
import InputPrueba from "./components/InputPrueba";
import ListPruebas from "./components/ListPruebas";

function App() {
  return (
    <Fragment>
      <div className = "container">
        <InputPrueba />
        <ListPruebas />
      </div>
    </Fragment>
  )
}

export default App;
