import React,{ useState } from 'react'
import { Modal, Form, Input } from 'antd'

const AddProperty = ({ isModalVisible, handleCancel, handleOk }) => {
    const [propertyName, setPropertyName] = useState('')
    const handleSubmit = () => {
        handleOk(propertyName)
        setPropertyName('')
    }
    return (

        <Modal title='Add Property' visible={isModalVisible} onCancel={handleCancel} onOk={handleSubmit} >
        <Form onSubmitCapture={handleSubmit} >
            <Form.Item><Input value={propertyName} onChange={ evt => setPropertyName(evt.target.value) } /></Form.Item>
        </Form>
        </Modal>
    )
}

export default AddProperty
