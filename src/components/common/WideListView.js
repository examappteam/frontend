import React from 'react'
import "./listStyle.css"
import { extname } from 'path';

function WideListView(props){
        return(
                <div className="wideContainer">
                        <div className="wideDescription">
                                <h1>{props.title}</h1>
                                <p>{props.exam.description}</p>
                                <p>{props.exam.date}</p>
                        </div>
                </div>
        )

}
export default WideListView