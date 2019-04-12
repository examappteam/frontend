import React, {Component} from "react"
import "../../style.css"
import ChatWindow from "./ChatWindow";
import ParticipantList from "./ParticipantList";

class TwilioTeacherVideo extends Component {
    localMediaContainer;
    participantList = new ParticipantList();
    chat = new ChatWindow();
    fetchAddress = "http://examapp.crenxu.com:22501/";
    dataTrackList = [];
    id = 0;
    constructor() {
        super()
        this.handler = this.handler.bind(this);
        this.sendTextMessage = this.sendTextMessage.bind(this);
        this.state = {
            token: "",
            identity: "TestTeacher",
            roomName: "TestRoom",
            chosenStudent: "All"
        }
    }

    handler(studentIdentity) {
        this.setState({
            chosenStudent: studentIdentity
        });
        console.log(this.state.chosenStudent);
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
            console.log("ASETETAAN IDENTITY");
            console.log(data);
            this.setState({
                identity: data.name
            })
        });
        console.log(this.state.identity);
        this.twilioConnection();
    }

    componentDidUpdate() {
        this.chat.setSendToName(this.state.chosenStudent);
    }

    sendTextMessage(receiver, message) {
        for(var i = 0; i < this.dataTrackList.length; i++) {
            if(this.dataTrackList[i].id === receiver) {
                this.dataTrackList[i].send(message);
            }
        }
    }

    twilioConnection() {
        var _this = this;
        var localTracks = null;
        const Video = require("twilio-video");
        console.log("connecting Twilio");
        // Request data, audio and video tracks
        Video.createLocalTracks().then(function(tracks) {
            console.log("Luodaan video ja ääniraidat");
            console.log(tracks);
            localTracks = tracks;
            localTracks.forEach(function(track){
                console.log("Track: " + track);
                var mediaElement = track.attach();
                document.getElementById('teacher-preview').appendChild(mediaElement);
            });
            console.log("Onnistui");
        }).then(function() {
            const fullAddress = _this.fetchAddress.concat("main/tokens?identity=").concat(_this.state.identity).concat("&roomName=").concat(_this.state.identity);
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
                        token: data
                    })
                });
            console.log("Token: " + _this.state.token);
            Video.connect(_this.state.token, {
                name: _this.state.identity,
                video: true,
                audio: true,
                tracks: localTracks
            }).then(function(room) {
                    console.log("Connected to room: ");
                    console.log(room.name);
                    console.log(room.participants);
                    
                    room.participants.forEach(function(participant) {
                        //tee Peer-to-peer huone jokaisen käyttäjän kanssa. Huoneen nimi = participant.identity
                        const fullAddress = _this.fetchAddress.concat("main/tokens?identity=").concat(_this.state.identity).concat("&roomName=").concat(participant.identity);
                        _this.participantList.addParticipantToList(participant.identity);
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
                            //Yhdistä luotuun huoneeseen
                            const localDataTrack = new Video.LocalDataTrack();
                            localDataTrack.id = participant.identity;
                            _this.dataTrackList.push(localDataTrack);
                            Video.connect(data, {
                                tracks: [localDataTrack]
                            }).then(function(peer_room) {
                                console.log('Successfully joined a Room: ', peer_room);
                                //kuuntele jos oppilas lähettää viestin huoneessa ja näytä se Teacher chat elementissä
                                peer_room.participants.forEach(function(participant) {
                                    participant.on('trackSubscribed', track => {
                                        console.log(`Participant "${participant.identity}" added ${track.kind} Track ${track.sid}`);
                                        if (track.kind === 'data') {
                                            track.on('message', data => {
                                            _this.chat.showMessage(participant,_this.state.identity,data);
                                            });
                                        }
                                    });
                                        
                                });
                            }, function(error) {
                                console.error('Unable to connect to Room: ' +  error.message);
                                });
                        });
                    });

                    room.on('participantConnected', participant => {
                        console.log(`Participant connected: ${participant.identity}`);
                        //tee Peer-to-peer huone jokaisen käyttäjän kanssa. Huoneen nimi = participant.identity
                        const fullAddress = _this.fetchAddress.concat("main/tokens?identity=").concat(_this.state.identity).concat("&roomName=").concat(participant.identity);
                        _this.participantList.addParticipantToList(participant.identity);
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
                            //Yhdistä luotuun huoneeseen
                            const localDataTrack = new Video.LocalDataTrack();
                            localDataTrack.id = participant.identity;
                            _this.dataTrackList.push(localDataTrack);
                            Video.connect(data, {
                                tracks: [localDataTrack]
                            }).then(function(peer_room) {
                                console.log('Successfully joined a Room: ', peer_room);
                                //kuuntele jos oppilas lähettää viestin huoneessa ja näytä se Teacher chat elementissä
                                peer_room.participants.forEach(function(participant) {
                                    participant.on('trackSubscribed', track => {
                                        console.log(`Participant "${participant.identity}" added ${track.kind} Track ${track.sid}`);
                                        if (track.kind === 'data') {
                                            track.on('message', data => {
                                                _this.chat.showMessage(participant,_this.state.identity,data);
                                            });
                                        }
                                    });
                                        
                                });
                            }, function(error) {
                                console.error('Unable to connect to Room: ' +  error.message);
                                });
                        });
                    });
                    
                    room.on('participantDisconnected', participant => {
                        console.log(`Participant disconnected: ${participant.identity}`);
                        this.participantList.removeParticipantFromList(participant.identity);
                    });
                });
            });
        }

    render() {
        var handler = this.handler;
        var sendTextMessage = this.sendTextMessage;
        return (
            <div>
                <div className="pure-g">
                    <div id="teacher-preview" className="pure-u-1-3 pure-u-md-1-3" ></div>
                    <div className="pure-u-1-3 pure-u-md-1-3"><div id="teacher-chat"><ChatWindow sendTextMessage = {sendTextMessage.bind(this)} identity={this.state.identity}/></div></div>
                    <div className="pure-u-1-3 pure-u-md-1-3"><div id="participant-list-component"><ParticipantList handler = {handler.bind(this)} /></div></div>
                </div>
            </div>
        )
    }
}
    
export default TwilioTeacherVideo