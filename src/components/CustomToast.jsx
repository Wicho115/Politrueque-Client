import React from "react";

const CustomToast = ({ type, message }) => {

    switch (type) {
        case "success":
            return (
                <div>
                    <i class="fa fa-check-circle-o"></i>  {message}
                </div>
            );

        case "error":
            return (
                <div>
                    <i class="fa fa-arrow-right"></i> {message}
                </div>
            );

        case "warning":
            return (
                <div>
                    <i class="fa fa-exclamation-triangle"></i> {message}
                </div>
            );

        default:
            return (
                <div>
                    <i class="fa fa-check-circle-o"></i> Algo Ocurrió
                </div>
            );
    }

}

export default CustomToast;