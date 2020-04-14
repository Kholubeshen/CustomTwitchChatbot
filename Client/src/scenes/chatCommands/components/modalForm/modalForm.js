
import React from "react";
import './modalForm.css';
import { TabSelection } from "react-web-tabs";
class ModalForm extends React.Component {
    constructor(props) {
        super(props);
        // console.log("props", props);
        this.state = {
            //True: create new command, false: update command
        }    
    }
    render() {
        // console.log("props", this.props);
        if (!this.props.show) {
            return null;
        }
        return (
            <div>
                <div className='modal-outer'>
                    {/* Things that don't scroll */}
                    {/* <div className='modal-guts'>
                        Things that scroll
                        {this.props.children}
                    </div> */}
                    <form id='modal-form' action='' className='flex-form-container' method='post' >
                        <div id="modal-col-1">
                            <div className='modal-line'>
                                <label className="modal-label">Command:</label>
                                <input id="command-input" onChange={this.requiredOnChange} className="modal-input input" type='text' name='command' defaultValue={this.props.formData.commandName} required />
                            </div>
                            <div className='modal-line'>
                                <label className="modal-label">GCD:</label>
                                <input id="gcd-input" className='cooldown-input modal-input' type='number' name='gcd' defaultValue={this.props.formData.gcd} required />
                                <label className="modal-label">UCD:</label>
                                <input id="ucd-input" className='cooldown-input modal-input' type='number' name='ucd' defaultValue={this.props.formData.ucd} required />
                            </div>
                            <div className='modal-line'>
                                <label className="modal-label">UserLevel:</label>
                                <select id="userLevel-input" className="modal-input" name='userLevel' defaultValue='everyone'>
                                    <option value="everyone">Everyone</option>
                                    <option value="moderator">Moderator</option>
                                    <option value="subscriber">Subscriber</option>
                                    <option value="vip">VIP</option>
                                </select>
                            </div>
                            <div className='modal-line'>
                                <label className="modal-label">Aliases</label>
                                <div className='tooltip'>(?)
                                    <span className='aliases-tooltip-text'>Alternate command names. Separate by commas.</span>
                                </div>
                                <input id="aliases-input" className="modal-input" type='text' name='aliases' />
                            </div>
                        </div>

                        <div id="modal-col-2">
                            <div className='modal-line'>
                                <label className="modal-label">Message(s):</label>
                            </div>
                            <textarea onChange={this.requiredOnChange} className="modal-input input"
                                id="modal-messages-input" 
                                type='text' name='messages'
                                required form='modal-form'
                                wrap="hard"
                                defaultValue={this.props.formData.message}
                                >
                            </textarea>
                            <div className='modal-line'>
                                <label className="modal-label">Randomize:</label>
                                <input className="modal-checkbox" type='checkbox' name='randomize'/>
                            </div>

                            <div className='modal-buttons-container'>
                                <button type='button' className='modal-button' id='modal-submit-button' onClick={this.submit}>Submit</button>
                                <button type='button' className='modal-button' id='modal-cancel-button' onClick={this.closeModal}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div
                    className='modal-overlay'
                    id='modal-overlay'
                    onClick={this.closeModal}>    
                </div>
            </div>
        )
    }

    requiredOnChange = () => {
        let commandIsValid = document.getElementById("command-input").checkValidity();
        let messageIsValid = document.getElementById("modal-messages-input").checkValidity();
        let submitButton = document.getElementById("modal-submit-button");
        if(commandIsValid && messageIsValid){
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    fillForm = () => {

    }

    submit = () => {
        let commandName = document.getElementById("command-input").value;
        let message = document.getElementById("modal-messages-input").value;
        let gcd = document.getElementById("gcd-input").value;
        let ucd = document.getElementById("ucd-input").value;

        console.log("Props", this.props.formData.id);

        let formData = {
            id:this.props.formData.id,
            enabled:true,
            //userLevel:this.props.formData
            //msgs:{
                //randomize:bool,
                //replies[]  
            //},
            //userUses:[
            //     {
            //         username://User who used command,
            //         useTime://Last used time 
            //     }
            // ],
            // lastGlobalUse://Last global use time
            commandName:commandName,
            message:message,

            gcd:gcd,
            ucd:ucd,

        }
        this.postToServer(formData)
    }
    
    postToServer = (formData) => {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify(formData)
        };
        let url;

        if(this.props.modalIsSave){
            url = 'http://localhost:9001/commands/add'
        } else {
            url = 'http://localhost:9001/commands/update'
        }
        console.log("data", formData);
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {

                if(data.response == "Success") {
                    this.props.refreshTable();
                    this.closeModal();
                } else {
                    //Notify user of what they are missing.
                }
            });

    }

    closeModal = () => {
        this.props.onClose();
    }
}

export default ModalForm;