import React from 'react'
import { Form, InputNumber } from 'antd'

const NumberProps = ({ handleNumChange }) => {
    return (
        <>
        <Form.Item label='Multiple Of' ><InputNumber name='multipleOf' onChange={ num => handleNumChange(num,'multipleOf') } /></Form.Item>
        <Form.Item label='Minimum' ><InputNumber name='minimum' onChange={num => handleNumChange(num,'minimum')} /></Form.Item>
        <Form.Item label='Maximum' ><InputNumber name='maximum' onChange={num => handleNumChange(num,'maximum')} /></Form.Item>
        <Form.Item label='Exclusive Minimum' ><InputNumber name='exclusiveMinimum' onChange={num => handleNumChange(num,'exclusiveMinimum')} /></Form.Item>
        <Form.Item label='Exclusive Maximum' ><InputNumber name='exclusiveMaximum' onChange={num => handleNumChange(num,'exclusiveMaximum')} /></Form.Item>
        </>
    )
}

export default NumberProps
