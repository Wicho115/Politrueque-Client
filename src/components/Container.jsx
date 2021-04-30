import React from "react";

import Nav from "./Nav";
import Footer from "./Footer";

const Container = (props) => {
  return (
    <>
      <Nav />
      <div className="chiquito">
        <div className="contenedor_general_1">          
          {props.children}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Container;
