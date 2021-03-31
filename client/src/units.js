import React from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';
import axios from 'axios';

function Unit(props) {
    return (
      <option value={props.val}>{props.name}</option>
    )
  }
  
function UnitGroup(props) {
    let unitOptions = []
    //Populate unitOptions with Units
    for (const unit of props.units) {
        unitOptions.push(<Unit val={unit.unit} name={unit.name}/>)
    }

    /*
    for (const [key,value] of Object.entries(props.units)) {
        unitOptions.push(<Unit val={key} name={value}/>)
        //return <SelectItem val={key} name={value}></SelectItem>
    }
    */


    return (
        <optgroup label={props.unitTypeName}>
        {unitOptions}
        </optgroup>
    )
}

class UnitField extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this)
        //this.componentWillMount = this.componentWillMount(this)
        this.state= {
            weight: [],
            volume: []
        };
    }
    /*
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
    */
    componentWillMount() {
        axios.get('/units')
            .then(response => {
                console.log(response)
                this.setState({
                    weight:response.data.weight,
                    volume:response.data.volume
                })
            })
    }

    onChange(event) {
        const name = event.target.name
        const value = event.target.value
        this.props.onChange(name, value)
    }

    render() {
        return (
            <NativeSelect id={this.props.id} name={this.props.id} onChange={this.onChange}>
                <option aria-label="None" value="" />
                <UnitGroup units={this.state.weight} unitTypeName="Weight"/>
                <UnitGroup units={this.state.volume} unitTypeName="Volume"/>
            </NativeSelect>
        )
    }
}

export default UnitField;