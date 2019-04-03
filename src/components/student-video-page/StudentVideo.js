import React, {Component} from "react"
import "../../style.css"
import ChatWindow from "../teacher-exam-video-page/ChatWindow"
import AnswerBox from "./AnswerBox"

class StudentVideo extends Component {
    fetchAddress = "http://examapp.crenxu.com:22501/";
    chatWindow = new ChatWindow();
    dataTrack = null;
    constructor() {
        super()
        this.sendTextMessage = this.sendTextMessage.bind(this);
        this.state = {
            groupRoomToken: "",
            privateRoomToken:"",
            identity: "Student",
            teacherIdentity: "TestTeacher"
        }
        this.attachTrack = this.attachTrack.bind(this);
    }

    attachTrack(track) {
        if(track.kind === "video" || track.kind === "audio") {                       // HYVÄKSYTÄÄN VAIN ÄÄNI JA VIDEO TRACKIT, JÄTETÄÄN DATA TRACK TÄSSÄ VAIHEESSA VIELÄ KÄYTTÄMÄTTÄ (SITÄ TARVITAAN VASTA CHATIN LUOMISEEN)
            var student_video = document.getElementById('teacher-preview');          
            student_video.appendChild(track.attach());							     // TÄMÄ LISÄÄ <video> ja <audio> ELEMENTIN <div> ELEMENTIN LAPSEKSI JOLLOIN VIDEO ALKAA NÄKYÄ DIV ELEMENTIN SISÄLLÄ.
            console.log("Track attached: " + track.kind);
        }
    }

    sendTextMessage(receiver, message) {
        if(this.dataTrack !== null && message !== "" && message !== null) {
            this.dataTrack.send(message)
        }
    }

    componentDidMount() {
        console.log("componentDidMmount");
        const fullAddress = this.fetchAddress.concat("user/").concat(this.id);
        console.log(fullAddress);
        fetch(fullAddress, {
            method:  'GET',
            headers: {
                Accept: 'application/json',
                Authorization: sessionStorage.getItem('jwtToken'),
                'Content-Type': 'application-json',
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("data");
            console.log(data);
            this.setState({
                identity: data.name
            })
        });
        this.chatWindow.setSendToName("");
        this.connectToRoom();
    }

    connectToRoom() {
        //TODO fetch token from server
        const fullAddress = this.fetchAddress.concat("?identity=").concat(this.state.identity,"&roomName=",this.state.teacherIdentity);
        console.log("Address: " + fullAddress);
        /*fetch(fullAddress, {
            method:  'GET',
            headers: {
                Accept: 'application/json',
                Authorization: sessionStorage.getItem('jwtToken'),              //<------- LISÄÄ TOKEN
                'Content-Type': 'application-json',
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("data");
            console.log(data);
            this.setState({
                groupRoomToken: data
            })
        });*/
        this.setState({
            groupRoomToken: "eyJjdHkiOiJ0d2lsaW8tZnBhO3Y9MSIsInR5cCI6IkpXVCIsImFsZyI6IkhTMjU2In0.eyJpc3MiOiJTSzUzNzFhZWVmN2M4Y2VkZWI5NjZiMzA2MTg4NGYzYmI5IiwiZXhwIjoxNTUzODU4NTI2LCJncmFudHMiOnsiaWRlbnRpdHkiOiJTdHVkZW50IiwidmlkZW8iOnsicm9vbSI6IlRlc3RUZWFjaGVyIn19LCJqdGkiOiJTSzUzNzFhZWVmN2M4Y2VkZWI5NjZiMzA2MTg4NGYzYmI5LTE1NTM4NTQ4NDgiLCJzdWIiOiJBQ2IzNTkxMzg1M2MxNTE2MTM2OWI5YmFjM2U0ZmYzOTg4In0.5R3Q8sjc7OFm6wk2IbTjJ71EysJ_2Q4wlk8PANTDFpI"
        })
        //TODO fetch teacher name from server and use it as a room name
        const Video = require("twilio-video");
        const _this = this;
        Video.connect("eyJjdHkiOiJ0d2lsaW8tZnBhO3Y9MSIsInR5cCI6IkpXVCIsImFsZyI6IkhTMjU2In0.eyJpc3MiOiJTSzUzNzFhZWVmN2M4Y2VkZWI5NjZiMzA2MTg4NGYzYmI5IiwiZXhwIjoxNTUzODU4NTI2LCJncmFudHMiOnsiaWRlbnRpdHkiOiJTdHVkZW50IiwidmlkZW8iOnsicm9vbSI6IlRlc3RUZWFjaGVyIn19LCJqdGkiOiJTSzUzNzFhZWVmN2M4Y2VkZWI5NjZiMzA2MTg4NGYzYmI5LTE1NTM4NTQ4NDgiLCJzdWIiOiJBQ2IzNTkxMzg1M2MxNTE2MTM2OWI5YmFjM2U0ZmYzOTg4In0.5R3Q8sjc7OFm6wk2IbTjJ71EysJ_2Q4wlk8PANTDFpI", {
            name: this.state.teacherIdentity,
            video:false,		
            audio:false
        }).then(function(room)
        {
            console.log("Connected student to room: " + room.name);   //room MUUTTUJA SISÄLTÄÄ TIEDOT HUONEESTA, KUTEN NIMEN, SID:N, HUONEESSA OLEVAT KÄYTTÄJÄT (participants)
            console.log("Room participants" + room.participants);
            room.participants.forEach(function(participant)
             {
                    console.log("Participant identity: " + participant.identity);
                    participant.on('trackSubscribed', _this.attachTrack);
                    participant.tracks.forEach(function(track) 
                    {                   
                        _this.attachTrack(track);
                    })
                    //Jos participant on opettaja, luodaan peer-to-peer huone
                    if(participant.identity === room.name) {
                        _this.chatWindow.setSendToName(participant.identity);
                        //TODO fetch token from server
                        const fullAddress = _this.fetchAddress.concat("?identity=").concat(_this.state.identity,"&roomName=",_this.state.teacherIdentity);
                        console.log("Address: " + fullAddress);
                        fetch(fullAddress, {
                            method:  'GET',
                            headers: {
                                Accept: 'application/json',
                                Authorization: sessionStorage.getItem('jwtToken'),              //<------- LISÄÄ TOKEN
                                'Content-Type': 'application-json',
                            }
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log("data");
                            console.log(data);
                            _this.setState({
                                privateRoomToken: data
                            })
                        });
                        _this.dataTrack = new Video.LocalDataTrack();
                        Video.connect(_this.state.privateRoomToken, {
                            name: _this.state.identity,
                            video:false,		
                            audio:false,
                            tracks: [_this.dataTrack]
                        }).then(function(room)
                        {
                            console.log("Privaatti huone luotu: " + room.name);
                        })
                    }
            })

            room.on('participantConnected', participant => {
                console.log("Participant identity: " + participant.identity);
                participant.on('trackSubscribed', _this.attachTrack); 
                participant.tracks.forEach(function(track) 
                {                   
                    _this.attachTrack(track);
                })
                //Jos participant on opettaja, luodaan peer-to-peer huone
                if(participant.identity === room.name) {
                    _this.chatWindow.setSendToName(participant.identity);
                    fetch(fullAddress, {
                        method:  'GET',
                        headers: {
                            Accept: 'application/json',
                            Authorization: sessionStorage.getItem('jwtToken'),              //<------- LISÄÄ TOKEN
                            'Content-Type': 'application-json',
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log("data");
                        console.log(data);
                        _this.setState({
                            privateRoomToken: data
                        })
                    });
                    const localDataTrack = new Video.LocalDataTrack();
                    Video.connect(this.state.privateRoomToken, {
                        name: _this.state.identity,
                        video:false,		
                        audio:false,
                        tracks: [localDataTrack]
                    }).then(function(room)
                    {
                        console.log("Privaatti huone luotu: " + room.name);
                    })
                }
            })
        });
    }

    render() {
        var sendTextMessage = this.sendTextMessage;
        return (
            <div>
                <div id="teacher-preview" className="pure-u-1-3 pure-u-md-1-3" ></div>
                <div className="pure-u-1-3 pure-u-md-1-3"><div id="teacher-chat"><ChatWindow sendTextMessage = {sendTextMessage.bind(this)} identity={this.state.identity}/></div></div><br/>
                <div className="pure-u-1-1 pure-u-md-1-1 padded-box"><p><AnswerBox /></p></div>
            </div>
        )
    }

    
}

export default StudentVideo