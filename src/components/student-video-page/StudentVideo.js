import React from "react";
import ChatWindow from "..teacher-exam-video-page/ChatWindow";

class StudentVideo extends Component {
    
    constructor() {
        super()
        this.sendTextMessage = this.sendTextMessage.bind(this);
        this.state = {
            groupRoomToken: "",
            privateRoomToken:"",
            identity: "Student",
            teacherIdentity: "TestTeacher"
        }
    }

    sendTextMessage(receiver, message) {
        for(var i = 0; i < this.dataTrackList.length; i++) {
            if(this.dataTrackList[i].id === receiver) {
                this.dataTrackList[i].send(message);
            }
        }
    }

    componentDidMount() {
        console.log("componentDidMmount");
        const fullAddress = fetchAddress.concat("user/").concat(id);
        fetch(fullAddress)
        .then(response => response.json())
        .then(data => {
            console.log("data");
            console.log(data);
            this.setState({
                identity: data.name
            })
        });
        this.connectToRoom();
    }

    connectToRoom() {
        //TODO fetch token from server
        const fetchAddress = "kevindewit.io:22777/tokens?identity=";
        const fullAddress = fetchAddress.concat(this.state.identity,"&roomName=",this.state.teacherIdentity);
        console.log("Address: " + fullAddress);
        fetch(fullAddress)
        .then(response => response.json())
        .then(data => {
            console.log("data");
            console.log(data);
            this.setState({
                groupRoomToken: data
            })
        });
        //TODO fetch teacher name from server and use it as a room name
        Video.connect(this.state.groupRoomToken, {
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
                    participant.on('trackSubscribed', attachTrack);
                    participant.tracks.forEach(function(track) 
                    {                   
                        attachTrack(track);
                    })
                    //Jos participant on opettaja, luodaan peer-to-peer huone
                    if(participant.identity === room.name) {
                        //TODO fetch token from server
                        const fetchAddress = "kevindewit.io:22777/tokens?identity=";
                        const fullAddress = fetchAddress.concat(this.state.identity,"&roomName=",this.state.teacherIdentity);
                        console.log("Address: " + fullAddress);
                        fetch(fullAddress)
                        .then(response => response.json())
                        .then(data => {
                            console.log("data");
                            console.log(data);
                            this.setState({
                                privateRoomToken: data
                            })
                        });
                        const localDataTrack = new Video.LocalDataTrack();
                        Video.connect(this.state.privateRoomToken, {
                            name: this.state.identity,
                            video:false,		
                            audio:false,
                            tracks: [localDataTrack]
                        }).then(function(room)
                        {
                            console.log("Privaatti huone luotu: " + room.name);
                        })
                    }
            })

            room.on('participantConnected', participant => {
                console.log("Participant identity: " + participant.identity);
                participant.on('trackSubscribed', attachTrack); 
                participant.tracks.forEach(function(track) 
                {                   
                    attachTrack(track);
                })
                //Jos participant on opettaja, luodaan peer-to-peer huone
                if(participant.identity === room.name) {
                    fetch(fullAddress)
                    .then(response => response.json())
                    .then(data => {
                        console.log("data");
                        console.log(data);
                        this.setState({
                            privateRoomToken: data
                        })
                    });
                    const localDataTrack = new Video.LocalDataTrack();
                    Video.connect(this.state.privateRoomToken, {
                        name: this.state.identity,
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

	attachTrack(track) {
        if(track.kind === "video" || track.kind === "audio") {                       // HYVÄKSYTÄÄN VAIN ÄÄNI JA VIDEO TRACKIT, JÄTETÄÄN DATA TRACK TÄSSÄ VAIHEESSA VIELÄ KÄYTTÄMÄTTÄ (SITÄ TARVITAAN VASTA CHATIN LUOMISEEN)
            var student_video = document.getElementById('teacher-preview');          
            student_video.appendChild(track.attach());							     // TÄMÄ LISÄÄ <video> ja <audio> ELEMENTIN <div> ELEMENTIN LAPSEKSI JOLLOIN VIDEO ALKAA NÄKYÄ DIV ELEMENTIN SISÄLLÄ.
            console.log("Track attached: " + track.kind);
        }
    }

    render() {
        var sendTextMessage = this.sendTextMessage;
        return (
            <div>
                <div id="teacher-preview" className="pure-u-1-3 pure-u-md-1-3" ></div>
                <div className="pure-u-1-3 pure-u-md-1-3"><div id="teacher-chat"><ChatWindow sendTextMessage = {sendTextMessage.bind(this)} identity={this.state.identity}/></div></div>
            </div>
        )
    }

    
}

export default StudentVideo