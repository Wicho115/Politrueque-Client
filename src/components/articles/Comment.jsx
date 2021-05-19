import React from "react";

import Card from "../cards/Card";

const Comment = ({ author, content, createdAt }) => {

    return (
        <>
            <Card>
                <p className="card-text">{content}</p>
                <hr />
                <div style={{  textAlign: "right" }}>
                    <small className="text-muted">Comentado el {createdAt} por {author}</small>
                </div>
            </Card>
            <br />
        </>
    )

}

export default Comment;