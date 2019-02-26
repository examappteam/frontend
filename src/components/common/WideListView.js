import React from 'react'
import "./styles/WideListView.css"

function WideListView(props){
        return(
                <div className="wide-container">
                <h1>{props.title}</h1>
                        <div className="wide-description">         
                                <p>{props.exam.description}</p>
                        </div>
                        <div className="wide-date">
                                <h3>{props.exam.date}</h3>
                        </div>
                </div>
        )

}
export default WideListView