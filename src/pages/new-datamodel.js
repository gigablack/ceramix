import React, { useEffect } from "react";
import { Typography, Form, Button, Divider, Input, Select } from "antd";
import { useSchema } from "../Contexts/Schema/SchemaContext";
import { useRedirect } from "../hooks/useRedirect";

const { Title } = Typography;

const NewDataModel = () => {
  useRedirect();
  const [form] = Form.useForm();
  const { schemasList, getSchemas, publishModel, publishingModel } =
    useSchema();
  useEffect(() => {
    getSchemas();
  }, []);
  return (
    <>
      <Title style={{ textAlign: "center" }}>New Data Model</Title>
      <Form form={form} onFinish={publishModel}>
        <Divider>Definition</Divider>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="schema"
          initialValue={schemasList[0]?.streamID}
          label="schema"
          rules={[{ required: true }]}
        >
          <Select>
            {schemasList.map((schema) => (
              <Select.Option
                key={schema.streamID}
                value={`${schema.title}-${schema.streamID}`}
              >
                {schema.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Divider>Model</Divider>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="modelDescription"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={publishingModel}>
          Publish Data Model
        </Button>
      </Form>
    </>
  );
};

export default NewDataModel;
