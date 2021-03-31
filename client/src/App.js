import logo from './logo.svg';
import './App.css';
import { isPropertySignature, isTemplateSpan, isThisTypeNode, reduceEachTrailingCommentRange } from 'typescript';
import axios from 'axios';
import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import UnitField from './units.js';
//const densityTable = require('./densities.json');
import ingredients from './ingredients.json';

function App() {
  return (
    <div className="App">
      <ConversionForm />

    </div>
  )

  /*
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  */
}


function InputField(props) {
  const onInputChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    props.onChange(name, value)
  }

  return (
    <TextField
      id={props.id}
      name={props.name}
      label="Enter a value"
      type="number"
      onChange={onInputChange}
      variant="outlined" />
  )
}


class DensitiesField extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(event, newValue) {
    this.props.onChange("density", newValue)
  }

  render() {
    return (
      <Autocomplete
            id="density"
            name="density"
            onChange={this.onChange}
            options={ingredients}
            //getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Ingredient" variant="outlined" />}
          />
    )
  }
}

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    }
  }
  render() {
    return <div>{this.state.value}</div>
  }
}


class ConversionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val1: "",
      unit1: "",
      unit2: "",
      density: "",
      output: ""
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(name, value) {
    this.setState({
      [name]: value
    }, this.handleSubmit)
  }

  handleSubmit() {
    let readyToSend = true
    for (const val of ["val1", "unit1", "unit2", "density"]) {
      if (this.state[val] == "") {
        readyToSend = false
        break
      }
    }
    if (readyToSend) {
      const searchParams = new URLSearchParams()
      const result = <Result />

      //Load form values held in "state" into POST-ready format
      for (const [key, value] of Object.entries(this.state)) {
        searchParams.set(key, value)
      }

    console.log("Sending")
    console.log(this.state)
    axios.post("/convert", searchParams)
      .then(response => {
        console.log(response);
        this.setState({output:response.data})
      })
      //event.preventDefault();
    }
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Convert:
            <InputField
              id="val1"
              name="val1"
              //value={this.state.val1}
              onChange={this.handleInputChange} />
            <UnitField
              id="unit1"
              value={this.state.unit1}
              onChange={this.handleInputChange} />
            <UnitField
              id="unit2"
              value={this.state.unit2}
              onChange={this.handleInputChange} />
            <DensitiesField onChange={this.handleInputChange} />
          </label>
        </form>
        <h1>{this.state.output}</h1>
      </div>
    )
  }

}

export default App;
