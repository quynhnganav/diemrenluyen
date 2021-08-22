import React, { createContext, useCallback, useContext, useReducer, useState } from "react";
import { reducer } from "./utils";

const PropsContext = createContext()

const ContextProvider = ({ children, data }) => {

    const [state, setState] = useReducer(reducer, {
        dsSinhViens: [],
        index: 0
    })

    return (
        <PropsContext.Provider
            value={{
                state,
                setState
            }}
        >
            {children}
        </PropsContext.Provider>
    )

}

export default ContextProvider

export const useDataProps = () => useContext(PropsContext)

export const useListSinhVien = () => {
    const { state, setState } = useContext(PropsContext);

    const nextSV = useCallback(() => {
        setState({
            index: state.index + 1,
        })
    }, [state])

    const prevSV = useCallback(() => {
        setState({
            index: state.index - 1,
        })
    }, [state])

    const gotoSV = useCallback((id) => {
        const findIndex = state.dsSinhViens.findIndex(d => d.id == id)
        setState({
            index: findIndex,
        })
    }, [state])

    const setIdsSv = useCallback((svs) => {
        setState({
            dsSinhViens: svs,
        })
    }, [])

    return {
        current: state.dsSinhViens[state.index],
        next: state.dsSinhViens[state.index + 1],
        prev: state.dsSinhViens[state.index - 1],
        nextSV,
        prevSV,
        gotoSV,
        setIdsSv,
        dsSinhViens: state.dsSinhViens
    }

}