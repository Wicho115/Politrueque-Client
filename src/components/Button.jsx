import React from "react";
import { Link } from "react-router-dom";

const Button = ({children, refer, fill, Click}) => {

  const buttonStyle={
    backgroundColor: (fill)? "rgb(128,0, 64)" : "rgb(255,255,255)",
        borderColor: "rgb(128,0, 64)",
        color: (fill)? null : "rgb(128,0, 64)"
  }
  return (
    <Link
      onClick={Click}
      to={refer}      
      style={buttonStyle}
      className="btn btn-primary"
    >
      {children}
    </Link>
  );
};

export default Button;
