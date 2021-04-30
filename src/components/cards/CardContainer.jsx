import React from 'react';

const CardContainer = (props)=>{
    return(
        <div className="artículos_display">
            {props.children}
        </div>
    );
}

export default CardContainer;