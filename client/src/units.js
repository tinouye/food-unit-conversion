import React from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';
import axios from 'axios';
import { flattenDiagnosticMessageText, isWhiteSpaceLike } from 'typescript';

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
        this.updateParentState = this.updateParentState.bind(this)
        this.state= {
            weight: [],
            volume: [],
        };
    }

    //Populate state with unit options from API
    componentWillMount() {
        axios.get('/units')
            .then(response => {
                console.log(response)
                this.setState({
                    weight:response.data.weight,
                    volume:response.data.volume
                })
                //Note: default value is chosen blind to unit options, probably bad design
                this.updateParentState(this.props.id, this.props.defaultValue)
            })
    }

    onChange(event) {
        console.log(event.target)
        const name = event.target.name;
        const value = event.target.value;
        
        this.updateParentState(name, value)
    }

    updateParentState(name, value) {
        //Determine unit type of "value"
        //No type if unit is found in neither group
        //This could probably be a class function but whatever
        let unitType = "";
        for (const unit of this.state.weight) {
            if (unit.unit == value) {
                unitType = "weight";
                break;
            }
        }
        if (unitType == "") {
            for (const unit of this.state.volume) {
                if (unit.unit == value) {
                    unitType = "volume";
                    break;
                }
            }
        }  

        this.props.onChange(name, value, unitType)
    }

    render() {
        return (
            <NativeSelect
                id={this.props.id}
                name={this.props.id}
                value={this.props.value}
                onChange={this.onChange}>
                <option aria-label="None" value="" />
                <UnitGroup units={this.state.weight} unitTypeName="Weight"/>
                <UnitGroup units={this.state.volume} unitTypeName="Volume"/>
            </NativeSelect>
        )
    }
}

export default UnitField;