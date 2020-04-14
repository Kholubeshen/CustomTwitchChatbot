import React from "react";
import ReactDOM from 'react-dom';
import ToggleSwitch from '../toggleSwitch/toggleSwitch';

class TableRow extends React.Component {
    constructor(props){
        super(props);
        this.state ={key:props.command};
    }
    deleteCommand = () => {
        this.props.delete(this.state.key);
    }

    editCommand = () => {
        console.log("props", this.props);
        this.props.edit({
            id:this.props.id,
            commandName:this.props.command,
            message:this.props.message,
            // userLevel:this.props.,
            ucd:this.props.ucd,
            gcd:this.props.gcd
        });
    }

    render() {
        return (
            <tr key={this.state.key}>
                <td><ToggleSwitch checked={this.props.enabled}/></td>
                <td>{this.props.command}</td>
                <td>{this.props.type}</td>
                <td>{this.props.message}</td>
                <td>{this.props.ucd}</td>
                <td>{this.props.gcd}</td>
                <td><button onClick={this.deleteCommand}>Delete</button></td>
                <td><button onClick={this.editCommand}>Edit</button></td>
            </tr>
        )
    }
}
export default TableRow;