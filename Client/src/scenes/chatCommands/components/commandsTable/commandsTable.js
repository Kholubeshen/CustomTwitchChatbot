import React, { useReducer } from "react";
import ReactDOM from 'react-dom';
import TableRow from "./tableRow";
import ModalForm from "../modalForm/modalForm";

class CommandsTable extends React.Component {
    constructor(data){
        super(data);

        this.state = {
            commands: [
            ],
            modalIsSave:true,
            showModal: false,
            modalFormData: {
                commandName:"Default",
                message:"",
                userLevel:"Everyone",
                ucd:"0",
                gcd:"0"
            }
        }   

    }

    componentDidMount = () => {
        this.loadTableRows();
    }

    render() {  
        return( 
            <div>
                <button onClick={() => this.addNewCommand(true)}>Add Command</button>
                <ModalForm 
                    modalIsSave={this.state.modalIsSave}
                    id="commandModal"
                    formData={this.state.modalFormData}
                    refreshTable={this.refreshTable}
                    onClose={this.toggleModal} 
                    show={this.state.show}
                />
                <table border="1">
                    <tbody id='commandTable'>
                        <tr key = 'tableHeader'>
                            <td>Enabled</td>
                            <td>Command</td>
                            <td>Type</td>
                            <td>Message</td>
                            <td>UCD</td>
                            <td>GCD</td>
                            <td>Delete</td>
                            <td>Edit</td>
                        </tr>
                        {this.state.commands.map((command) => (
                            command
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    refreshTable = () => {
        this.clearTable();
        this.loadTableRows();
    }

    clearTable = () => {
        this.setState({commands: []});        
    }

    loadTableRows = () => {
        //Send Request to Server to load commands from DB
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type' : 'application/json'}
        };
        
        fetch('http://localhost:9001/commands/get_all', requestOptions)
            .then(response => response.json())
            .then(data => {
                for(let i = 0; i < data.length; i++){
                    this.addRowToTable(data[i]);
                }
        });
    }

    deleteRow = (commandName) => {
        let commandsArr = this.state.commands;
            const requestOptions = {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({commandName}),
                headers: { 'Content-Type' : 'application/json'},
            };

            //Send request to server to remove from database.
            fetch('http://localhost:9001/commands/delete', requestOptions)
            .then(response => response.json())
            .then(data => {
                switch(data.status){
                case 200:
                    console.log("Successfully deleted");

                    //On Successful removal from database remove from table.
                    for(let i = 0; i < commandsArr.length; i++){
                        if(commandsArr[i].key == commandName){
                            
                            commandsArr.splice(i, 1);
                            this.setState({commands: commandsArr});
                        }
                    }
                    this.refreshTable();
                    break;
                case 500:
                    console.log("Server side error.");
                    break;
                default:
                    console.log("Unknown error code: ", data.status);
                }
            })
    }
    
    addNewCommand = () => {
        this.setState({
            modalIsSave:true,
            modalFormData:{
                commandName:"",
                message:"",
                // userLevel:data.userLevel,
                ucd:"0",
                gcd:"0"
            }
        }, () => {

            //Sets the state of parent to show modal
            this.toggleModal(true);
        })
    }

    editCommand = (data) => {
        console.log("Data", data);
        this.setState({
            modalIsSave:false,
            modalFormData:{
                id:data.id,
                commandName:data.commandName,
                message:data.message,
                // userLevel:data.userLevel,
                ucd:data.ucd,
                gcd:data.gcd
            }
        }, () => {

            //Sets the state of parent to show modal
            this.toggleModal(false);
        })
    }

    addRowToTable = (data) => {
        let commandsArr = this.state.commands;
        let length = commandsArr.length;
       
        let commandRow =             
        (<TableRow 
            key = {data._id}
            id = {data._id}
            enabled = {data.enabled}
            command = {data.commandName}
            message = {data.message}
            ucd = {data.ucd}
            gcd = {data.gcd}
            delete = {this.deleteRow}
            edit = {this.editCommand}
        />)

        commandsArr.push(commandRow)
        this.setState({commands: commandsArr});
    }

    toggleModal = (modalIsSave) => {
        // if(modalIsSave){
            this.setState({
                modalIsSave:modalIsSave
            }, () => {
                this.setState({
                    show: !this.state.show
                });
            });
    }
}

export default CommandsTable;