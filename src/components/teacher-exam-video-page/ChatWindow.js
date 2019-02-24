import React, {Component} from "react"
import "../../style.css"
import TwilioTeacherVideo from "./TwilioTeacherVideo.js";

class ChatWindow extends Component {
    chatBody;
    currentdate = new Date();
    sendButton = document.getElementById("send-message-button");
    inputText = document.getElementById("message-input");

    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        };
    
        this.handleChange = this.handleChange.bind(this);
      }

    showMessage(identity,message) {
        const tr = document.createElement("tr");
        var hour = this.currentdate.getHours();
        var minute = this.currentdate.getMinutes();
        var second = this.currentdate.getSeconds();
        var time = "" + hour + ".";
        if(minute > 9){
            time = time + minute + ".";
        }
        else{
            time = time + "0" + minute + ".";
        }
        if(second > 9){
            time = time + second;
        }
        else{
            time = time + "0" + second;
        }
        const tdTime = document.createElement("td");
        tdTime.classList.add("time-element");
        const nodeTime = document.createTextNode(time);
        tdTime.appendChild(nodeTime);
        tr.appendChild(tdTime);

        const tdIdentity = document.createElement("td");
        tdIdentity.classList.add("identity-element");
        const nodeIdentity = document.createTextNode(identity);
        tdIdentity.appendChild(nodeIdentity);
        tr.appendChild(tdIdentity);

        const tdMessage = document.createElement("td");
        tdMessage.classList.add("message-element");
        const nodeMessage = document.createTextNode(message);
        tdMessage.appendChild(nodeMessage);
        tr.appendChild(tdMessage);

        this.chatBody = document.getElementById("chat-body");
        this.chatBody.appendChild(tr);
        if(this.chatBody.childElementCount > 13) {
            this.chatBody.removeChild(this.chatBody.firstChild);
        }
    }

    sendMessage() {
        const identity = TwilioTeacherVideo.state.identity;
        //Show own message on chat
        this.showMessage(identity,this.state.inputValue);

        //TODO Send message to chosen student
    }

    handleChange(event) {
        this.setState({inputValue: event.target.value});
      }

    render() {
        return(
            <div>
                <table className="pure-table-horizontal" id="chat-window" class="pure-table">
                    <thead>
                        <tr>
                            <th className="time-element">Time</th>
                            <th className="identity-element">Name</th>
                            <th className="message-element">Message</th>
                        </tr>
                    </thead>
                    <tbody id="chat-body">

                    </tbody>
                </table>
                <input type="text" value={this.state.value} id="message-input" onChange={this.handleChange}></input>
                <button id="send-message-button" class="pure-button pure-button-primary" onClick={this.sendMessage}>SEND</button>
            </div>
        )
    }

}

export default ChatWindow