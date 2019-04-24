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
    peerRooms = [];
    hostName = "wss://m24.cloudmqtt.com:34820";
    client;
    mRoom;
    lastMessage = "";
    mqtt = require('mqtt');
    options = {
        keepalive: 10,
        clientId: 'teacherexample',
        protocolId: 'MQTT',
        protocolVersion: 4,
        clean: true,
        retain: true,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
        will: {
          topic: 'exam-app',
          payload: '',
          qos: 0,
          retain: true
        },
        username: 'tidpauhp',
        password: 'wITVbwMtwaMo',
        rejectUnauthorized: false
      }
    constructor() {
        super()
        this.handler = this.handler.bind(this);
        this.sendTextMessage = this.sendTextMessage.bind(this);
        this.setState = this.setState.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            token: null,
            identity: null,
            roomName: null,
            examid: "1",
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
        const _this = this;
        this.state.identity = sessionStorage.getItem('email');
        this.client = this.mqtt.connect(this.hostName,this.options);
        console.log("Client object:")
        console.log(this.client);
        console.log("mqtt object:");
        console.log(this.mqtt);
        this.client.on('connect', function () {
            _this.client.subscribe("exam-app",{qos:0});
          })

        this.client.on('message', function (topic, message) {
            // message is Buffer

            console.log(message.toString());
            if(topic === "exam-app") {

            }
            else {
                if(message != _this.lastMessage) {
                    _this.chat.showMessage(topic,_this.state.identity,message);
                }
            }
          })
        this.twilioConnection();
    }

    componentDidUpdate() {
        this.chat.setSendToName(this.state.chosenStudent);
    }

    componentWillUnmount() {
        this.client.publish("exam-app","");
        if(this.mRoom != null) {
            this.mRoom.disconnect();
        }
        this.peerRooms.forEach(function(room) {
            room.disconnect();
        })
        this.peerRooms = [];
    }

    sendTextMessage(receiver, message) {
        const _this = this;
        if(message != "" || message != null) {
            _this.lastMessage = message;
            if(receiver === "All") {
                this.peerRooms.forEach(function(room) {
                    _this.client.publish(room.name,message);
                })
            }
            else {
                this.client.publish(receiver,message);
            }
        }
        /*for(var i = 0; i < this.dataTrackList.length; i++) {
            this.dataTrackList[i].send(message);
        }*/
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
                const mediaElement = track.attach();
                document.getElementById('teacher-preview').appendChild(mediaElement);
            });
            console.log("Onnistui");
        }).then(function() {
            const fullAddress = _this.fetchAddress.concat("main/exam/").concat(_this.state.examid);
            console.log(fullAddress);
            console.log(sessionStorage.getItem('jwtToken'));
            fetch(fullAddress, {
                method:  'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: sessionStorage.getItem('jwtToken'),
                    'Content-Type': 'application-json',
                }
            })
            .then(response => response.json())
            .then(data1 => {
                console.log(data1);
                _this.state.roomName = data1.exam.title;
            }).then(function() {
                const fullAddress = _this.fetchAddress.concat("main/twilio/videotoken?identity=").concat(_this.state.identity).concat("&roomName=").concat(_this.state.roomName);    //<---USE EXAM NAME AS ROOMNAME
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
                    .then(data2 => {
                        console.log("data on: ");
                        console.log(data2);
                        _this.setState({
                            token: data2
                        })
                    }).then(function() {
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
                            _this.mRoom = room;
                            _this.client.publish("exam-app","room:".concat(room.name).concat("|").concat("examid:").concat(_this.state.examid).concat("|").concat("teacher:").concat(_this.state.identity).concat("|"));
                            
                            room.participants.forEach(function(participant) {
                                _this.client.subscribe(participant.identity,{qos:0});
                                //tee Peer-to-peer huone jokaisen käyttäjän kanssa. Huoneen nimi = participant.identity
                                const fullAddress = _this.fetchAddress.concat("main/twilio/videotoken?identity=").concat(_this.state.identity).concat("&roomName=").concat(participant.identity);
                                _this.participantList.addParticipantToList(participant.identity);
                                fetch(fullAddress, {
                                    method:  'GET',
                                    headers: {
                                        Accept: 'application/json',
                                        Authorization: sessionStorage.getItem('jwtToken'),
                                        'Content-Type': 'application-json',
                                    }
                                })
                                .then(response => response.text())
                                .then(data => { 
                                    //Yhdistä luotuun huoneeseen
                                    const localDataTrack = new Video.LocalDataTrack();
                                    _this.dataTrackList.push(localDataTrack);
                                    Video.connect(data, {
                                        tracks: [localDataTrack]
                                    }).then(function(peer_room) {
                                        console.log('Successfully joined a Room: ', peer_room);
                                        /*
                                        _this.peerRooms.push(peer_room);
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
                                                
                                        });*/
                                    }, function(error) {
                                        console.error('Unable to connect to Room: ' +  error.message);
                                        });
                                });
                            });

                            room.on('participantConnected', participant => {
                                console.log(`Participant connected: ${participant.identity}`);
                                _this.client.subscribe(participant.identity,{qos:0});
                                //tee Peer-to-peer huone jokaisen käyttäjän kanssa. Huoneen nimi = participant.identity
                                const fullAddress = _this.fetchAddress.concat("main/twilio/videotoken?identity=").concat(_this.state.identity).concat("&roomName=").concat(participant.identity);
                                _this.participantList.addParticipantToList(participant.identity);
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
                                    //Yhdistä luotuun huoneeseen
                                    const localDataTrack = new Video.LocalDataTrack();
                                    _this.dataTrackList.push(localDataTrack);
                                    Video.connect(data, {
                                        tracks: [localDataTrack]
                                    }).then(function(peer_room) {
                                        console.log('Successfully joined a Room: ', peer_room);
                                        _this.peerRooms.push(peer_room);
                                        //kuuntele jos oppilas lähettää viestin huoneessa ja näytä se Teacher chat elementissä
                                        peer_room.participants.forEach(function(participant) {
                                            participant.on('trackAdded', track => {
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
                                _this.participantList.removeParticipantFromList(participant.identity);
                            });

                            room.on('disconnect', room => {
                                console.log("Disconnected from room.");
                                room.localParticipant.tracks.forEach(publication => {
                                    const attachedElements = publication.track.detach();
                                    attachedElements.forEach(element => element.remove());                                
                                })
                            });
                        });
                    });
                });
            })

            
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