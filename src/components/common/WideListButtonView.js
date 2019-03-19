import React from 'react'
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import "./styles/WideListView.css"

function WideListButtonView(props){
        console.log(props)
        return(
                <div className="wide-container">
                    <div className="pure-g">
                        <div className="pure-u-4-5">
                            <h1 className="wide-title">{props.title}</h1>
                        </div>
                        <div className="pure-u-1-5">
                            <Link to="/exam_view">
                                <button id="wide-button" className="pure-button pure-button-primary">
                                    Start exam
                                </button>
                            </Link>
                        </div>
                    </div>
                        <div className="wide-description">         
                                <p>{props.exam.description}</p>
                        </div>
                        <div className="wide-date">
                                <h3>{props.exam.date}</h3>
                        </div>
                    </div>
        )
}
export default WideListButtonView