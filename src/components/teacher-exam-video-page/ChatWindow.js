import React, {Component} from "react"
import "../../style.css"

class ChatWindow extends Component {
    chatBody;
    sendButton = document.getElementById("send-message-button");
    inputText = document.getElementById("message-input");

    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            sender: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    showMessage(sender,receiver,message) {
        var currentdate = new Date();
        const tr = document.createElement("li");
        tr.classList.add("chat-list-element");
        var hour = currentdate.getHours();
        var minute = currentdate.getMinutes();
        var second = currentdate.getSeconds();
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
        const tdTime = document.createElement("p");
        tdTime.classList.add("time-element");
        const nodeTime = document.createTextNode(time);
        tdTime.appendChild(nodeTime);
        tr.appendChild(tdTime);

        const tdIdentity = document.createElement("p");
        tdIdentity.classList.add("identity-element");
        const nodeIdentity = document.createTextNode(sender + " -> " + receiver);
        tdIdentity.appendChild(nodeIdentity);
        tr.appendChild(tdIdentity);

        const tdMessage = document.createElement("p");
        tdMessage.classList.add("message-element");
        const nodeMessage = document.createTextNode(message);
        tdMessage.appendChild(nodeMessage);
        tr.appendChild(tdMessage);

        this.chatBody = document.getElementById("chat-body");
        this.chatBody.appendChild(tr);
/*         if(this.chatBody.childElementCount > 13) {
            this.chatBody.removeChild(this.chatBody.firstChild);
        } */
        const chatWindow = document.getElementById("chat-window");
        chatWindow.scrollTop = chatWindow.scrollHeight - chatWindow.clientHeight;
    }

    sendMessage() { 
        const sender = this.state.sender;
        var receiver = document.getElementById("sendToName").innerText;
        //Show own message on chat
        this.showMessage(sender,receiver,this.state.inputValue);
        this.props.sendTextMessage(receiver,this.state.inputValue);
        this.inputText = document.getElementById("message-input");
        this.inputText.value = "";
    }

    handleChange(event) {
        this.setState({ sender: this.props.identity});
        this.setState({ inputValue: event.target.value});
      }

    setSendToName(identity) {
        document.getElementById("sendToName").innerText = identity;
    }
      
    render() {
        return(
            <div>
                <div id="chat-window" className="pure-menu pure-menu-scrollable custom-restricted">
                    
                    <ul id="chat-body" className="pure-menu-list">

                    </ul>
                </div>
                <input type="text" value={this.state.value} id="message-input" onChange={this.handleChange}></input>
                <button id="send-message-button" className="pure-button pure-button-primary" onClick={this.sendMessage}>SEND</button>
                <div><p id="sendToText">Send to:</p><p id="sendToName">All</p></div>
            </div>
        )
    }

}

export default ChatWindow