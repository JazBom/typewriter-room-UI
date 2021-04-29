import React from "react";

const PublicLayout = ({ component: Comp, ...rest }) => {

    return (
        <>
        <Comp {...rest} />
        </>
    )

};
export { PublicLayout };