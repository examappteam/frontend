import React from "react"
import "../style.css"


function Header() {
    return (
        <header className="navbar">
            <div className="pure-g">
                <div className="pure-u-1 pure-u-md-1-3"><img id="logo" src="images/examapp-logo.png" alt="Examapp"></img></div>
                <div className="pure-u-1 pure-u-md-1-3"></div>
                <div className="pure-u-1 pure-u-md-1-3"><button id="logout-button" class="pure-button pure-button-primary">Logout</button></div>
            </div>
        </header>
    )
}

export default Header