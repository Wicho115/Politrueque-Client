import React from "react";
import { Link } from "react-router-dom";

import Card from "../cards/Card";

const Comment = ({ author, content, createdAt }) => {

    return (
        <>
            <Card>
                <div style={{ border: "solid red"}}>
                    {author}
                </div>
                <div style={{ border: "solid green", width: "25%", display: "inline-block" }}>
                    {createdAt}
                </div>
                <div style={{ border: "solid blue", width: "75%", display: "inline-block" }}>
                    {content}
                </div>                
            </Card>
            <br />
        </>
    )

}

export default Comment;