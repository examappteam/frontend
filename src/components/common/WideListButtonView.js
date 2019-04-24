import React from 'react'
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import "./styles/WideListView.css"

function WideListButtonView(props){
        return(
            
                <div className="wide-container">
                {console.log("props exam",props.exam)}
                    <div className="pure-g">
                        <div className="pure-u-4-5">
                            <h1 className="wide-title">{props.title}</h1>
                        </div>
                        <div className="pure-u-1-5">
                        
                            <Link to="/exam_view">
                                <button onClick={console.log(props.exam)} id="wide-button" className="pure-button pure-button-primary">
                                    Start exam
                                </button>
                            </Link>
                        </div>
                    </div>
                        <div className="wide-description">         
                                <p>{"Description"}</p>
                        </div>
                        <div className="wide-date">
                                <h3>{"Date"}</h3>
                        </div>
                    </div>
        )
}
export default WideListButtonView