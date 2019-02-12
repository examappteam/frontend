import React from 'react'
import "./listStyle.css"

function ListView(props){
        console.log(props)
        const exams = props.exam.map(exam => <li className="listItem" key={exam.key}> <p>{exam.name}</p><p>{exam.date}</p></li>)
        return(
                <div>
                <h1 className="listTitle">{props.title}</h1>
                <div className="listView">
                
                        <ul className="listContainer">
                                {exams}
                        </ul>
                </div>
                </div>
        )
}

export default ListView