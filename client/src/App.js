//import logo from './logo.svg';
import './App.css';
//import { isPropertySignature, isTemplateSpan, isThisTypeNode, reduceEachTrailingCommentRange } from 'typescript';
import axios from 'axios';
import React from 'react';

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
      defaultValue={props.defaultValue}
      label="Enter a value"
      type="number"
      onChange={onInputChange}
      variant="outlined" />
  )
}


class IngredientsField extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }
  
  onChange(event, newValue) {
    //this.setState({value:newValue, inputValue:newValue})
    this.props.onChange("ingredient", newValue)
  }
  

  render() {
    return (
      <Autocomplete
        id="ingredient"
        name="ingredient"
        value={this.props.value}
        onChange={this.onChange}
        inputValue={this.props.inputValue}
        onInputChange={this.props.onInputChange}
        options={this.props.options}
        //getOptionLabel={(option) => option.title}
        style={{ width: 300 }}
        disabled={this.props.disabled}
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
      val1: "2",
      //Default units are set in Render so that unit and type can be changed together
      unit1: "",
      unit1Type: "none",
      unit2: "",
      unit2Type: "none",
      ingredient: ingredients[1],
      ingredientsIsDisabled: false,
      ingredientInput: "",
      output: ""
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStateUpdate = this.handleStateUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(name, value, unitType="") {
    let setStateObj = {[name]:value};
    if (unitType) {
      //Hack to force unit's type to update in state
      setStateObj[name+"Type"] = unitType;
    }
    this.setState(setStateObj, this.handleStateUpdate);
  }

  //Update ingredientsIsDisabled here after unitType has updated, also decide whether to submit
  handleStateUpdate() {
    console.log(this.state)
    let newIngredientsIsDisabled;
    if (this.state.unit1Type == this.state.unit2Type && this.state.unit1Type != "none") {
      newIngredientsIsDisabled = true;
    }
    else {
      newIngredientsIsDisabled = false;
    }
    this.setState({ingredientsIsDisabled: newIngredientsIsDisabled});

    //Decide if ready to AJAX, doesn't have to wait for above state update
    //Since newIngredients says whether ingredient is relevant
    let readyToSend = true;
    let checkFields = ["val1", "unit1", "unit2"]
    if (!newIngredientsIsDisabled) {
      checkFields.push("ingredient")
    }
    for (const val of checkFields) {
      if (!this.state[val]) {
        readyToSend = false
        break
      }
    }
    if (readyToSend) {
      this.handleSubmit()
    }
    else {
      this.setState({output: ""})
    }
  }

  handleSubmit() {
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

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit} id="mainForm">
          <h2>Convert: </h2>
          <InputField
            id="val1"
            name="val1"
            defaultValue="2"
            //value={this.state.val1}
            onChange={this.handleInputChange} />
          <UnitField
            id="unit1"
            value={this.state.unit1}
            defaultValue={"cup"}
            onChange={this.handleInputChange} />
          <h2>to</h2>
          <UnitField
            id="unit2"
            value={this.state.unit2}
            defaultValue={"g"}
            onChange={this.handleInputChange} />
          <h2>{this.state.ingredientsIsDisabled ?
            "" : "of"}</h2>
          <Autocomplete
            value={this.state.ingredientsIsDisabled ? 
              "No Ingredient Necessary" :
              this.state.ingredient}
            onChange={(event, newValue) => {
              this.handleInputChange("ingredient", newValue)
            }}
            inputValue={this.state.ingredientInput}
            onInputChange={(event, newInputValue) => {
              this.setState({ingredientInput:newInputValue});
            }}
            options={ingredients}
            disabled={this.state.ingredientsIsDisabled}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Ingredient" variant="outlined" />} />
        </form>
        <h1>{this.state.output}</h1>
      </div>
    )
  }

}

export default App;
