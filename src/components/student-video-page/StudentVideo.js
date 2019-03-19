import React from "react";
//import ReactDOM from "react-dom";
//import Video from "twilio-video";

function StudentVideo() {
    
    const student_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2I2YmFjZTZkNDNlMGIwNWM2YmEyZmEwMTg5OGU2NmUyLTE1NTAwNTk3MDgiLCJpc3MiOiJTS2I2YmFjZTZkNDNlMGIwNWM2YmEyZmEwMTg5OGU2NmUyIiwic3ViIjoiQUM4MDI1MzUwMWE4NjA1Yzc1MDllNDc5NWFmMTY2YmI2YiIsImV4cCI6MTU1MDA2MzMwOCwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiVGVzdFN0dWRlbnQiLCJ2aWRlbyI6eyJyb29tIjoiVGVzdFJvb20ifX19.otU5z15O2sUBE8HbGXA4gnnmcswLM6fFoJ-QLIw7cck" //TÄHÄN ENCOODATTU TOKEN JOKA HAETAAN LOPULTA BACKENDISTÄ TAI TESTAILLESSA LUODAAN TWILION SIVUILLA OMALLA TILILLÄ
    const Video = require("twilio-video");
    Video.connect(student_token, {
                name: "TestRoom",   //TÄHÄN TULEE HUONEEN NIMI JOHON YHDISTETÄÄN (MAHDOLLISESTI LUOKAN NIMI, KUN SELLAINEN ON)
                video:false,		//OPPILAS EI LÄHETÄ VIDEO TAI ÄÄNIRAITOJA HUONEESEEN, JOTEN NÄMÄ false TILAAN
                audio:false,
            }).then(function(room)
            {
                console.log("Connected student to room: " + room.name);   //room MUUTTUJA SISÄLTÄÄ TIEDOT HUONEESTA, KUTEN NIMEN, SID:N, HUONEESSA OLEVAT KÄYTTÄJÄT (participants)
                console.log("Room participants" + room.participants);
                room.participants.forEach(function(participant)
                 {
                        console.log("Participant identity: " + participant.identity);
                        participant.on('trackSubscribed', attachTrack);    // ASETETAAN JOKAISELLE KÄYTTÄJÄLLE LISTENER, JOKA HAVAITSEE JOS KÄYTTÄJÄ ALKAA JAKAMAAN KUVAA, ÄÄNTÄ TAI DATAA HUONEESSA ELI tracks. SUORITETAAN attachTrack FUNKTIO JOS TÄMÄ TAPAHTUU. 
                        participant.tracks.forEach(function(track) 
                        {                   // JOS HUONEESSA AIEMMIN OLLUT KÄYTTÄJÄ JAKAA JO JOTAIN EDELLÄMAINITTUA, SUORITETAAN attachTrack FUNKTIO
							attachTrack(track);
						}
                    )
                })
            });
			
	function attachTrack(track) {
        if(track.kind === "video" || track.kind === "audio") {                       // HYVÄKSYTÄÄN VAIN ÄÄNI JA VIDEO TRACKIT, JÄTETÄÄN DATA TRACK TÄSSÄ VAIHEESSA VIELÄ KÄYTTÄMÄTTÄ (SITÄ TARVITAAN VASTA CHATIN LUOMISEEN)
            var student_video = document.getElementById('student-video');            // LUO <div> ELEMENTTI JA ANNA SILLE id 'student-video'. 
            student_video.appendChild(track.attach());							     // TÄMÄ LISÄÄ <video> ja <audio> ELEMENTIN <div> ELEMENTIN LAPSEKSI JOLLOIN VIDEO ALKAA NÄKYÄ DIV ELEMENTIN SISÄLLÄ.
            console.log("Track attached: " + track.kind);
        }
    }
    return (
        <div>
            <div id="student-video"></div>
        </div>
    )
}

export default StudentVideo