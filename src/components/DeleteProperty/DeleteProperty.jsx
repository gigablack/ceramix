import React, { useState } from "react";
import { Modal, Input, Form } from "antd";

const DeleteProperty = ({
  propName,
  isModalVisible,
  handleOk,
  handleCancel,
}) => {
  const [name, setName] = useState("");
  const handleDelete = () => {
    handleOk(name);
    setName("");
  };
  return (
    <Modal
      title="Delete Property"
      visible={isModalVisible}
      onCancel={handleCancel}
      onOk={handleDelete}
    >
      <p>type "{propName}" without quotes to delete.</p>
      <Form.Item>
        <Input
          onPressEnter={handleDelete}
          value={name}
          onChange={(evt) => setName(evt.target.value)}
        />
      </Form.Item>
    </Modal>
  );
};

export default DeleteProperty;
