import React, { createContext, useContext, useState } from "react";

const PropsContext = createContext()

const ContextProvider = ({ children, data }) => {

    const [dataContext] = useState(data)

    return (
        <PropsContext.Provider
            value={{
                data: dataContext
            }}
        >
            {children}
        </PropsContext.Provider>
    )

}

export default ContextProvider

export const useDataProps = () => useContext(PropsContext)