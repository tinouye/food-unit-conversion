import logo from './logo.svg';
import './App.css';

function App() {
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
}

function SelectItem(props) {
  return (
    <option value={props.val}>{props.val}</option>
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

  let options = []

  return (
    <select id={props.id} name={props.id}>


    </select>
  )
}

export default App;
