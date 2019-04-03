import React, {Component} from "react"
import "./styles/styles.css";

function NavBars(props) {
    return (
        <div className="pure-u-1-3">
            <p>
                <div className="pure-menu custom-restricted-width">
                    <span className="pure-menu-heading">Questions</span>
                    <ul className="pure-menu-list" id="grade-navbar">
                        <li className="pure-menu-item"><a href="#" className="pure-menu-link">Question 1</a></li>
                        {/*
                        <li className="pure-menu-item"><a href="#" className="pure-menu-link">Question 2</a></li>
                        <li className="pure-menu-item"><a href="#" className="pure-menu-link">Question 3</a></li>
                        <li className="pure-menu-item"><a href="#" className="pure-menu-link">Question 4</a></li>
                            */}
                    </ul>
                </div>
            </p>

            <p>
                <div className="pure-menu custom-restricted-width">
                    <span className="pure-menu-heading">Answers in current question</span>

                    <ul className="pure-menu-list" id="grade-navbar">
                        <li className="pure-menu-item">
                            <a href="#" className="pure-menu-link" onClick={props.handleFirstClick} >Answer 1</a>
                            </li>
                        <li className="pure-menu-item">
                            <a href="#" className="pure-menu-link" onClick={props.handleSecondClick}>Answer 2</a>
                            </li>
                        <li className="pure-menu-item">
                            <a href="#" className="pure-menu-link" onClick={props.handleThirdClick}>Answer 3</a>
                            </li>
                    </ul>
                </div>
            </p>
        </div>
    )
}


export default NavBars