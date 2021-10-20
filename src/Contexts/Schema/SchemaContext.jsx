import React, { createContext, useContext } from 'react'
import { useSchemaState } from './hooks/useSchemaState'

const SchemaContext = createContext()

export const useSchema = () => {
    return useContext(SchemaContext)
}

export const SchemaContextProvider = ({children}) => {
    const state = useSchemaState()
    return (
        <SchemaContext.Provider value={state} >{ children }</SchemaContext.Provider>
    )
}


