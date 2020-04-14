
import React from "react";
import ReactDOM from 'react-dom';
import './toggleSwitch.css';
class ToggleSwitch extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <input type="checkbox" className="toggle-switch" onClick={this.onToggle}  defaultChecked={this.props.checked}/>
        )
    }

    onToggle = () => {
        //Update Database with change.
    }
}
export default ToggleSwitch;