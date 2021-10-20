import React, { useEffect } from 'react'
import { Typography, Button } from 'antd'
import { Link } from 'gatsby'
import { useSchema } from '../Contexts/Schema/SchemaContext'

const { Title } = Typography

const SchemasPage = () => {

    const { schemasList, getSchemas } = useSchema()

    useEffect(() => {
        getSchemas()
    },[])
    return (
        <>
            <Title style={{ textAlign: 'center' }}>My Schemas</Title>
            <Link to='/new-schema'><Button type='primary'>New Schema</Button></Link>
            {schemasList.map(schema => (<li key={`${schema.title}-${schema.date}`}>{schema.title}</li>))}
        </>
    )
}

export default SchemasPage
