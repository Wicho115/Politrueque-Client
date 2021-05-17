import React from 'react';
import {Link} from 'react-router-dom'

const Section = (props) =>{
    return(
        <>
        <nav className="nav nav-pills nav-fill">
          <a
            className="nav-link active"
            style={{ backgroundColor: "rgb(128,0,64)" }}
          >
            {props.children}
          </a>
        </nav>
        <br />
        </>
    );
}   

export default Section;