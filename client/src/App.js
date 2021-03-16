import logo from './logo.svg';
import './App.css';
import { isPropertySignature, isTemplateSpan, isThisTypeNode, reduceEachTrailingCommentRange } from 'typescript';
import axios from 'axios';
import React from 'react';
const densityTable = require('./densities.json');

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

function Unit(props) {
  return (
    <option value={props.val}>{props.name}</option>
  )
}

function UnitGroup(props) {
  let unitOptions = []

  //Populate unitOptions with Units
  for (const [key,value] of Object.entries(props.units)) {
    unitOptions.push(<Unit val={key} name={value}/>)
    //return <SelectItem val={key} name={value}></SelectItem>
  }

  return (
    <optgroup label={props.unitTypeName}>
      {unitOptions}
    </optgroup>
  )
}

function UnitField(props) {
  const weight = {"oz":"Ounce", "lb":"Pound", "g":"Gram", "kg":"Kilogram"}
  const volume = {
    "tsp":"Teaspoon",
    "tbsp":"Tablespoon",
    "fl-oz":"Fluid Ounce",
    "cup":"Cup",
    "pint":"Pint",
    "quart":"Quart",
    "gal":"Gallon"
  }

  return (
    <select id={props.id} name={props.id} onChange={props.onChange}>
      <UnitGroup units={weight} unitTypeName="Weight"/>
      <UnitGroup units={volume} unitTypeName="Volume"/>
    </select>
  )
}

function Density(props) {
  return (
    <option value={props.gml}>{props.ingredient}</option>
  )
}

function DensitiesField(props) {
  //Populate array with Density HTML components
  let ingredients_alpha = Object.keys(densityTable).sort()
  let densities_html = []

  ingredients_alpha.forEach(item => {
    densities_html.push(<Density gml={densityTable[item]} ingredient={item}/>)
  })

  return (
    <select id="density" name="density" onChange={props.onChange}>
      {densities_html}
    </select>
  )
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

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
    console.log(this.state)
  }


  handleSubmit(event) {
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
    event.preventDefault();
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Convert:
            <input
              type="text"
              id="val1"
              name="val1"
              value={this.state.val1}
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
          <input type="submit" value="Submit" />
        </form>
        <div>{this.state.output}</div>
      </div>
    )
  }

}

export default App;
