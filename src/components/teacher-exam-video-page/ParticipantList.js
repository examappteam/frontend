import React, {Component} from "react"
import "../../style.css"

class ParticipantList extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            studentId: "Testi",
            handler: null
        }
        this.handleClick = this.handleClick.bind(this);
        this.addParticipantToList = this.addParticipantToList.bind(this);
    };

    handleClick(e) {
        this.props.handler(e.target.id);
    }

    componentDidMount() {
        console.log("ParticipantList mounted");
        this.addParticipantToList("All");
        this.addParticipantToList("Joroma");
        this.addParticipantToList("Palle");
    }

    addParticipantToList(identity) {
        console.log("addParticipantToList()");
        const list = document.getElementById("participant-list");
        const newElement = document.createElement("li");
        const nodeParticipant = document.createTextNode(identity);
        newElement.appendChild(nodeParticipant);
        newElement.classList.add("participantElement");
        newElement.id = identity;
        list.appendChild(newElement);
        newElement.addEventListener("click", this.handleClick);
    }

    removeParticipantFromList(identity) {
        const list = document.getElementById("participant-list");
        list.removeChild(document.getElementById(identity));
    }

    render() {
        return(
            <div>
                <div id="scrollable-list" class="pure-menu pure-menu-scrollable custom-restricted">
                    <ol id="participant-list">

                    </ol>
                </div>
            </div>
        )
    }
}

export default ParticipantList