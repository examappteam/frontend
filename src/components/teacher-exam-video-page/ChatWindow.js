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
            identity: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    showMessage(identity,message) {
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
        const nodeIdentity = document.createTextNode(identity);
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
        const identity = this.state.identity;
        //Show own message on chat
        this.showMessage(identity,this.state.inputValue);

        //TODO Send message to chosen student

        this.inputText = document.getElementById("message-input");
        this.inputText.value = "";
    }

    handleChange(event) {
        this.setState({ identity: this.props.identity});
        this.setState({ inputValue: event.target.value});
      }


      
    render() {
        return(
            <div>
                <div id="chat-window" class="pure-menu pure-menu-scrollable custom-restricted">
                    
                    <ul id="chat-body" class="pure-menu-list">

                    </ul>
                </div>
                <input type="text" value={this.state.value} id="message-input" onChange={this.handleChange}></input>
                <button id="send-message-button" class="pure-button pure-button-primary" onClick={this.sendMessage}>SEND</button>
            </div>
        )
    }

}

export default ChatWindow