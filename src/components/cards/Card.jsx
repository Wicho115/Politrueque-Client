import React from 'react';

const Card= ({title, subtitle, children}) =>{    
    return(
        <div className="card">
            <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>                                  
                    {children}
            </div>
        </div>
    );
}

export default Card;