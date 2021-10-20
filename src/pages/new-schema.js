import React from 'react'
import {Typography, Form, Input, Divider, Button} from 'antd'
import Property from '../components/Property/Property'
import { useSchema } from '../Contexts/Schema/SchemaContext'
import AddProperty from '../components/AddProperty/AddProperty'
import { useDID } from '../Contexts/DID/DIDContext'

const {Title} = Typography

const propTypes = {
    string: ['maxLength','minLength','pattern'],
    number: ['multipleOf','maximum','minimum','exclusiveMaximum','exclusiveMinimum'],
    array: ['maxItems','minItems','uniqueItems','maxContains','minContains']
}


const NewSchemaPage = () => {
    const [form] = Form.useForm()
    const {handleChangeSchema, isModalVisible, handleCancel, saveSchema, handleOk, showModal, properties} = useSchema()
    return (
        <>
            <Title style={{ textAlign: 'center' }}>New Schema</Title>
            <Form form={form} onFinishFailed={evt => console.log(evt)} onFinish={saveSchema} >
                <Form.Item label='Title' name='title' rules={[{ required: true }]}  ><Input name='title' onChange={handleChangeSchema} /></Form.Item>
                <Form.Item name='description' label='Description' rules={[{ required: true }]} ><Input name='description' onChange={handleChangeSchema} /></Form.Item>
                <Divider orientation='left'>Properties</Divider>
                <Button type='dashed' onClick={showModal} >Add Property</Button>
                {Object.keys(properties).map(prop => <Property key={prop} propName={prop} />)}
                <AddProperty isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} />
                <Divider></Divider>
                <Button type='primary' htmlType='submit'>Publish Schema</Button>
            </Form>
        </>
    )
}

export default NewSchemaPage
