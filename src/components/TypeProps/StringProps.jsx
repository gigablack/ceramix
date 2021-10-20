import React from "react";
import { Form, Input, InputNumber } from "antd";

const StringProps = ({ handleTextChange, handleNumChange }) => {
  return (
    <>
      <Form.Item label="Min Length">
        <InputNumber
          name="minLength"
          onChange={(evt) => handleNumChange(evt, "minLength")}
        />
      </Form.Item>
      <Form.Item label="Max Length">
        <InputNumber
          name="maxLength"
          onChange={(evt) => handleNumChange(evt, "maxLength")}
        />
      </Form.Item>
      <Form.Item label="Pattern">
        <Input name="pattern" onChange={handleTextChange} />
      </Form.Item>
    </>
  );
};

export default StringProps;
