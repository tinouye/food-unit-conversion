import logo from './logo.svg';
import './App.css';
require('axios')
import { isPropertySignature, isTemplateSpan, reduceEachTrailingCommentRange } from 'typescript';
import axios from 'axios';
let densityTable = require('./densities.json');

function App() {
  return (
    <div className="App">
      <label for="val1">Enter a value: </label>
      <input type="number" id="val1" name="val1"></input>
      <UnitField id="unit1"></UnitField>
      <UnitField id="unit2"></UnitField>

      <button onclick="sendConversion()">Convert!</button>

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
    <select id={props.id} name={props.id}>
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

function DensitiesOptions(props) {
  let ingredients_alpha = Object.keys(densityTable).sort()
  let densities_html = []

  ingredients_alpha.forEach(item => {
    densities_html.push(<Density gml={densityTable[item]} ingredient={item}/>)
  })

  return (
    <select id="density" name="density">
      {densities_html}
    </select>
  )
}


class ConversionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      va1: "",
      unit1: "",
      unit2: "",
      density: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    axios({
      method: 'post',
      url: '/convert',
      data: this.state
    })
    .then(response => {
      console.log(response)
    })
    event.preventDefault();
  }
  
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Convert:
          <input type="number" id="val1" name="val1"></input>
          <UnitField id="unit1"/>
          <UnitField id="unit2"/>
          <Density />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }

}

export default App;
