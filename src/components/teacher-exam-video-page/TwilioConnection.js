import React from "react"
import "../../style.css"

function TwilioConnection() {
    const test_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzU1MDRiYjllMWVmMTkwYjg0Y2JhMzdmMmU0NTBiMDA2LTE1NDk2NTI0ODYiLCJpc3MiOiJTSzU1MDRiYjllMWVmMTkwYjg0Y2JhMzdmMmU0NTBiMDA2Iiwic3ViIjoiQUM0ZTJmN2EyYmFiNGM2MTBhMjIwMGIwOGVhZDdlNTExYiIsImV4cCI6MTU0OTY1NjA4NiwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiVGVzdFRlYWNoZXIiLCJ2aWRlbyI6eyJyb29tIjoiVGVzdFJvb20ifX19.7lgWrv0_JoLTWaVLTKEzggKDbtErtQNEMQSgdGGGtA0";
    var localTracks = null;
    
    const Video = require("twilio-video");
    // Request data, audio and video tracks
    Video.createLocalTracks().then(function(tracks) {
      var localMediaContainer = document.getElementById('teacher-preview');
      var localDataTrack = new Video.LocalDataTrack();
      localTracks = tracks;
      localTracks.push(localDataTrack);
      localTracks.forEach(function(track) {
        if(track.kind === "data") {return;}
        localMediaContainer.appendChild(track.attach());
      });
    }).then(function() {
        //Create token here

        Video.connect(test_token, {
            name: "TestRoom",
            video: true,
            audio: true,
            tracks: localTracks
        }).then(function(room) {
            console.log("Connected to room: ");
            console.log(room.name);
        })
    });

    return (
        <div>
            <div className="pure-g">
                <div className="pure-u-1 pure-u-md-1-3" ><div id="teacher-preview"></div></div>
                <div className="pure-u-1 pure-u-md-1-3"></div>
                <div className="pure-u-1 pure-u-md-1-3"></div>
            </div>
        </div>
    )
}

export default TwilioConnection