import React from 'react'
import Layout from './src/components/Layout/Layout'
import 'antd/dist/antd.css';
import { SchemaContextProvider } from './src/Contexts/Schema/SchemaContext'
import { DIDContextProvider } from './src/Contexts/DID/DIDContext'

export const wrapRootElement = ({element}) => {
    return (
        <DIDContextProvider>
        <SchemaContextProvider>
        <Layout>
        {element}
        </Layout>
        </SchemaContextProvider>
        </DIDContextProvider>
    )
}
