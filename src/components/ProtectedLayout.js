import React from "react";
import { Nav } from './Nav';

const ProtectedLayout = ({ component: Comp, ...rest }) => {

    return (
        <>
        <Nav/>
        <Comp {...rest} />
        </>
    )

};
export { ProtectedLayout };