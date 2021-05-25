import React from "react";

const CustomToast = ({ type, message }) => {

    switch (type) {
        case "success":
            return (
                <div>
                    <i className="fa fa-check-circle-o"></i>  {message}
                </div>
            );

        case "error":
            return (
                <div>
                    <i className="fa fa-arrow-right"></i> {message}
                </div>
            );

        case "warning":
            return (
                <div>
                    <i className="fa fa-exclamation-triangle"></i> {message}
                </div>
            );

        default:
            return (
                <div>
                    <i className="fa fa-check-circle-o"></i> Algo Ocurrió
                </div>
            );
    }

}

export default CustomToast;