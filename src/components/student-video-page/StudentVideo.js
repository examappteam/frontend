import React, {Component} from "react"
import "../../style.css"
import ChatWindow from "../teacher-exam-video-page/ChatWindow"
import AnswerBox from "./AnswerBox"

class StudentVideo extends Component {
    fetchAddress = "http://localhost:22501/";
    chatWindow = new ChatWindow();
    dataTrack = null;
    groupRoom = null;
    peerRoom = null;
    lastMessage = "";
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

    mqtt = require('mqtt');
    options = {
        keepalive: 10,
        clientId: 'chatreceiver',
        protocolId: 'MQTT',
        protocolVersion: 4,
        clean: true,
        retain: false,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
        username: 'tidpauhp',
        password: 'wITVbwMtwaMo',
        rejectUnauthorized: false
      }
    client;
    hostName = "wss://m24.cloudmqtt.com:34820";

    attachTrack(track) {
        if(track.kind === "video" || track.kind === "audio") {                       // HYVÄKSYTÄÄN VAIN ÄÄNI JA VIDEO TRACKIT, JÄTETÄÄN DATA TRACK TÄSSÄ VAIHEESSA VIELÄ KÄYTTÄMÄTTÄ (SITÄ TARVITAAN VASTA CHATIN LUOMISEEN)
            var student_video = document.getElementById('teacher-preview');          
            student_video.appendChild(track.attach());							     // TÄMÄ LISÄÄ <video> ja <audio> ELEMENTIN <div> ELEMENTIN LAPSEKSI JOLLOIN VIDEO ALKAA NÄKYÄ DIV ELEMENTIN SISÄLLÄ.
            console.log("Track attached: " + track.kind);
        }
    }

    sendTextMessage(receiver, message) {
        if(message !== "" && message !== null) {
            this.lastMessage = message;
            this.client.publish(this.state.identity,message);
        }
    }

    componentDidMount() {
        console.log("componentDidMmount");
        const _this = this;
        this.client = this.mqtt.connect(this.hostName,this.options);
        this.client.on('connect', function () {
            _this.client.subscribe(_this.state.identity,{qos:0});
            })

        this.client.on('message', function (topic, message) {
            if(topic === _this.state.identity) {
                if(message != _this.lastMessage) {
                    _this.chatWindow.showMessage(_this.state.teacherIdentity,_this.state.identity,message);
                }
            }
        });
        this.state.identity = sessionStorage.getItem('email');
        this.state.examname = sessionStorage.getItem('roomToJoin');
        this.state.teacherIdentity = sessionStorage.getItem('teacherName');
        this.connectToRoom();
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
        this.client.end();
    }

    connectToRoom() {
        //TODO fetch token from server
        const _this = this;
        var fullAddress = this.fetchAddress.concat("main/twilio/videotoken?identity=").concat(this.state.identity,"&roomName=",this.state.examname);   //<---- USE EXAM NAME AS ROOMNAME
        console.log("Address: " + fullAddress);
        fetch(fullAddress, {
            method:  'GET',
            headers: {
                Accept: 'application/json',
                Authorization: sessionStorage.getItem('jwtToken'),              //<------- LISÄÄ TOKEN
                'Content-Type': 'application-json',
            }
        })
        .then(response => response.text())
            .then(data => {
            console.log("data from token fetch:");
            console.log(data);
            this.setState({
                groupRoomToken: data
            })
        }).then(function() {
            //TODO fetch teacher name from server and use it as a room name
            const Video = require("twilio-video");
            Video.connect(_this.state.groupRoomToken, {
                name: _this.state.examname,
                video:false,		
                audio:false
            }).then(function(room)
            {
                console.log("Connected student to room: " + room.name);   //room MUUTTUJA SISÄLTÄÄ TIEDOT HUONEESTA, KUTEN NIMEN, SID:N, HUONEESSA OLEVAT KÄYTTÄJÄT (participants)
                console.log("Room participants" + room.participants);
                _this.groupRoom = room;
                room.participants.forEach(function(participant)
                {
                        console.log("Participant identity: " + participant.identity);
                        participant.on('trackAdded', _this.attachTrack);
                        participant.tracks.forEach(function(track) 
                        {           
                            _this.attachTrack(track);
                        })
                        //Jos participant on opettaja, luodaan peer-to-peer huone
                        if(participant.identity === _this.state.teacherIdentity) {
                            _this.chatWindow.setSendToName(participant.identity);
                            //TODO fetch token from server
                            const fullAddress = _this.fetchAddress.concat("main/twilio/videotoken?identity=").concat(_this.state.identity,"&roomName=",_this.state.identity);
                            console.log("Address: " + fullAddress);
                            fetch(fullAddress, {
                                method:  'GET',
                                headers: {
                                    Accept: 'application/json',
                                    Authorization: sessionStorage.getItem('jwtToken'),              //<------- LISÄÄ TOKEN
                                    'Content-Type': 'application-json',
                                }
                            })
                            .then(response => response.text())
                            .then(data => {
                                console.log("data");
                                console.log(data);
                                _this.dataTrack = new Video.LocalDataTrack();
                                Video.connect(data, {
                                    name: _this.state.identity,
                                    video:false,		
                                    audio:false,
                                    tracks: [_this.dataTrack]
                                }).then(function(room)
                                {
                                    console.log("Privaatti huone luotu: " + room.name);
                                    _this.peerRoom = room;
                                })
                            });
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
                        fullAddress = this.fetchAddress.concat("main/twilio/videotoken?identity=").concat(this.state.identity,"&roomName=",this.state.identity);
                        fetch(fullAddress, {
                            method:  'GET',
                            headers: {
                                Accept: 'application/json',
                                Authorization: sessionStorage.getItem('jwtToken'),              //<------- LISÄÄ TOKEN
                                'Content-Type': 'application-json',
                            }
                        })
                        .then(response => response.text())
                        .then(data => {
                            console.log("data");
                                console.log(data);
                                _this.dataTrack = new Video.LocalDataTrack();
                                Video.connect(data, {
                                    name: _this.state.identity,
                                    video:false,		
                                    audio:false,
                                    tracks: [_this.dataTrack]
                                }).then(function(room)
                                {
                                    console.log("Privaatti huone luotu: " + room.name);
                                    this.peerRoom = room;
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