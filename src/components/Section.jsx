import React from 'react';
import {Link} from 'react-router-dom'

const Section = (props) =>{
    return(
        <>
        <nav className="nav nav-pills nav-fill">
          <Link
            className="nav-link active"
            style={{ backgroundColor: "rgb(128,0,64)" }}
          >
            {props.children}
          </Link>
        </nav>
        <br />
        </>
    );
}   

export default Section;