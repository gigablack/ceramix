import React,{ useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import { useDID } from '../../DID/DIDContext'


const baseSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object'
}

export const useSchemaState = () => {

    const [properties, setProperties] = useState({})
    const [required,setRequired] = useState([])
    const [schema, setSchema] = useState(baseSchema)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const { selfID, modelManager, isAuthenticated } = useDID()
    const [schemasList,setSchemasList] = useState([])

    const saveSchema = async () => {
        const schemaID = await modelManager.createSchema(schema.title, schema)
        let mySchemas = await selfID.get('mySchemas')
        if(!mySchemas){
            mySchemas = {}
            mySchemas.headers = []
        }
        mySchemas.headers.push({ title: schema.title, description: schema.description, date: `${Date.now()}`, streamID: schemaID })
        await selfID.set('mySchemas',mySchemas)
        setSchema(baseSchema)
        navigate('/schemas')
    }
    const getSchemas = async () => {
        if (isAuthenticated) {

        let schemas = await selfID.get('mySchemas')
        if (!schemas) {
            schemas = {}
            schemas.headers = []
        }
        setSchemasList(schemas.headers)
        }
    }
    const handleCancel = () => {
        setIsModalVisible(false)
    }
    const handleOk = propertyName => {

        setProperties(prev => ({ [propertyName]: {}, ...prev }))
        setIsModalVisible(false)
    }
    const showModal = () => setIsModalVisible(true)
    const handleChangeSchema = evt => {
        setSchema(prevSchema => {
            return {
                ...prevSchema,
                [evt.target.name]:evt.target.value
            }
        })
    }
    useEffect(() => {
        setSchema(prevSchema => ({
            ...prevSchema,
            properties,
            required
        }))
    }, [properties,required])
    useEffect(() => {
        console.log(schema)
    }, [schema])

    return {
        setProperties,
        setRequired,
        handleChangeSchema,
        isModalVisible,
        handleCancel,
        handleOk,
        showModal,
        properties,
        schema,
        saveSchema,
        getSchemas,
        schemasList
    }
}
