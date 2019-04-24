import React, {Component} from "react"
import "../../style.css"
import ChatWindow from "../teacher-exam-video-page/ChatWindow"
import AnswerBox from "./AnswerBox"

class StudentVideo extends Component {
    fetchAddress = "http://examapp.crenxu.com:22501/";
    chatWindow = new ChatWindow();
    dataTrack = null;
    groupRoom = null;
    peerRoom = null;
    constructor() {
        super()
        this.sendTextMessage = this.sendTextMessage.bind(this);
        this.state = {
            examid: null,
            examname: "",
            groupRoomToken: "",
            privateRoomToken:"",
            identity: "Student",
            teacherIdentity: ""
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
        const _this = this;
        this.state.identity = sessionStorage.getItem('email');
        this.state.examid = sessionStorage.getItem('onGoingExamID');
        const fullAddress = this.fetchAddress.concat("main/exam/").concat(this.state.examid);
        console.log(fullAddress);
        fetch(fullAddress, {
            method:  'GET',
            headers: {
                Accept: 'application/json',
                Authorization: sessionStorage.getItem('jwtToken'),
                'Content-Type': 'application-json',
            }
        }).then(response => response.json())
        .then(data => {
            _this.chatWindow.setSendToName(data.creatorId);
            _this.state.teacherIdentity = data.creatorId;
            _this.state.examname = data.title;
            this.connectToRoom();
            
        })
    }

    componentWillUnmount() {
        if(this.groupRoom != null) {
            console.log("Disconnectiing from grouproom")
            this.groupRoom.disconnect();
            this.groupRoom = null;
        }
        if(this.peerRoom != null) {
            console.log("Disconnecting from peerroom");
            this.peerRoom.disconnect();
            this.peerRoom = null;
        }
    }

    connectToRoom() {
        //TODO fetch token from server
        const fullAddress = this.fetchAddress.concat("main/twilio/videotoken?identity=").concat(this.state.identity,"&roomName=",this.state.examname);   //<---- USE EXAM NAME AS ROOMNAME
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
            console.log("data from token fetch:");
            console.log(data);
            this.setState({
                groupRoomToken: data
            })
        }).then(function() {
            //TODO fetch teacher name from server and use it as a room name
            const Video = require("twilio-video");
            const _this = this;
            Video.connect(this.state.groupRoomToken, {
                name: this.state.examname,
                video:false,		
                audio:false
            }).then(function(room)
            {
                console.log("Connected student to room: " + room.name);   //room MUUTTUJA SISÄLTÄÄ TIEDOT HUONEESTA, KUTEN NIMEN, SID:N, HUONEESSA OLEVAT KÄYTTÄJÄT (participants)
                console.log("Room participants" + room.participants);
                this.groupRoom = room;
                room.participants.forEach(function(participant)
                {
                        console.log("Participant identity: " + participant.identity);
                        participant.on('trackSubscribed', _this.attachTrack);
                        participant.tracks.forEach(function(track) 
                        {                   
                            _this.attachTrack(track);
                        })
                        //Jos participant on opettaja, luodaan peer-to-peer huone
                        if(participant.identity === _this.state.teacherIdentity) {
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
                                this.peerRoom = room;
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
                        }).then(function() {
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
                        })
                    }
                })
            });
        })
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