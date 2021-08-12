import React from "react";
import ContextProvider from ".";
import AppRouter from "./routers";

const RootApp = ({
    data
}) => {
    return (
        <ContextProvider data={data}>
            <AppRouter />
        </ContextProvider>
    )
}

export default RootApp