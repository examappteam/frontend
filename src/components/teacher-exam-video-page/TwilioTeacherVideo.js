import React, {Component} from "react"
import "../../style.css"
import ChatWindow from "./ChatWindow";
import ParticipantList from "./ParticipantList";

class TwilioTeacherVideo extends Component {
    testToken = "";
    localMediaContainer;
    participantList = new ParticipantList();
    chat = new ChatWindow();
    dataTrackList = [];
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
            const fetchAddress = "kevindewit.io:22777/tokens?identity=";
            const fullAddress = fetchAddress.concat(_this.state.identity,"&roomName=",_this.state.roomName);
            //const testTokenAddress = "https://burlywood-macaw-4586.twil.io/get_token?identity=";
            //const testTokenFullAddress = fetchAddress.concat(_this.state.identity,"&roomName=",_this.state.roomName);
            console.log("Address: " + fullAddress);

            fetch(fullAddress)
                .then(response => response.json())
                .then(data => {
                    console.log("data");
                    console.log(data);
                    //_this.state.token = data;
                    this.setState({
                        token: data
                    })
                });
            console.log("Token: " + this.state.token);
            Video.connect(this.state.token, {
                name: "TestRoom",
                video: true,
                audio: true,
                tracks: localTracks
            }).then(function(room) {
                    console.log("Connected to room: ");
                    console.log(room.name);
                    console.log(room.participants);
                    
                    room.participants.forEach(function(participant) {
                        //tee Peer-to-peer huone jokaisen käyttäjän kanssa. Huoneen nimi = participant.identity
                        const fetchAddress = "kevindewit.io:22777/tokens?identity=";
                        const fullAddress = fetchAddress.concat(_this.state.identity,"&roomName=",participant.identity);
                        this.participantList.addParticipantToList(participant.identity);
                        //const testAddress = "https://burlywood-macaw-4586.twil.io/create_peer_to_peer_room?student_identity=";
                        //const fullTestAddress = fetchAddress.concat(participant.identity);
                        fetch(fullAddress)
                        .then(response => response.json())
                        .then(data => { 
                            //Yhdistä luotuun huoneeseen
                            const localDataTrack = new Video.LocalDataTrack();
                            localDataTrack.id = participant.identity;
                            this.dataTrackList.push(localDataTrack);
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
                        const fetchAddress = "kevindewit.io:22777/tokens?identity=";
                        const fullAddress = fetchAddress.concat(_this.state.identity,"&roomName=",participant.identity);
                        this.participantList.addParticipantToList(participant.identity);
                        //const testAddress = "https://burlywood-macaw-4586.twil.io/create_peer_to_peer_room?student_identity=";
                        //const fullTestAddress = testAddress.concat(participant.identity);
                        fetch(fullAddress)
                        .then(response => response.json())
                        .then(data => { 
                            //Yhdistä luotuun huoneeseen
                            const localDataTrack = new Video.LocalDataTrack();
                            localDataTrack.id = participant.identity;
                            this.dataTrackList.push(localDataTrack);
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