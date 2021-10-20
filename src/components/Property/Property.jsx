import React from 'react'
import {Form, Input, Checkbox, Select, Divider, Button} from 'antd'
import StringProps from '../TypeProps/StringProps'
import NumberProps from '../TypeProps/NumberProps'
import { useProperty } from './hooks/useProperty'
import DeleteProperty from '../DeleteProperty/DeleteProperty'

const {Option} = Select


const Property = ({ propName }) => {

    const { setRequired, handleOk, handleCancel, showModal, isModalVisible, setType, required, key, type, handleTextChange, handleNumChange } = useProperty(propName)
    return (
        <>
        <Divider>{key}</Divider>
            <Form.Item name='type' initialValue={type} rules={[{ required: true }]} label='Type'>
                <Select onChange={ val => setType(val) }>
                    <Option value='string'>string</Option>
                    <Option value='number'>number</Option>
                    <Option value='array'>array</Option>
                    <Option value='boolean'>boolean</Option>
                    <Option value='ref'>ref</Option>
                </Select>
            </Form.Item>
            <Form.Item label='Required?'><Checkbox checked={required} onChange={evt => setRequired(evt.target.checked)} /></Form.Item>
            <Form.Item label='Title'><Input name='title' onChange={handleTextChange} /></Form.Item>
            <Form.Item label='Description'><Input name='description' onChange={handleTextChange} /></Form.Item>
        {type === 'string' && <StringProps handleTextChange={handleTextChange} handleNumChange={handleNumChange} />}
        { type === 'number' && <NumberProps handleNumChange={handleNumChange} /> }
            <Button type='primary' danger onClick={showModal}>Delete Property</Button>
            <DeleteProperty propName={propName} isModalVisible={isModalVisible} handleCancel={handleCancel} handleOk={handleOk} />
        </>
    )
}

export default Property
