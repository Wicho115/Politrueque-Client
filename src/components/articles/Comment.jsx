import React from "react";
import { Link } from "react-router-dom";
import auth from "../../auth/auth";

import Card from "../cards/Card";

const Comment = ({ author, content, Click, id }) => {

    const handleClick = (e) =>{
        Click(id);
    }

    return (
        <>
            <Card>
                <p className="card-text">{content}</p>
                <hr/>
                <div style={{  textAlign: "right" }}>
                    <small className="text-muted">Comentado por <Link to={`/user?u=${author._id}`}>{author.username}</Link></small>
                    {(author._id != auth.user._id) ? null : <button onClick={handleClick}> Eliminar</button>}
                    
                </div>
            </Card>
            <br />
        </>
    )

}

export default Comment;