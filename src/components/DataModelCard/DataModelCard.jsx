import React from "react";
import { Link } from "gatsby";
import { Typography, Card } from "antd";

const { Title } = Typography;

const DataModelCard = ({ model }) => {
  return (
    <Card
      style={{ width: 500, margin: "auto" }}
      title={model.title}
      extra={<Link to={`/app/models/${model.streamID}`}>View JSON</Link>}
    >
      <p>{model.description}</p>
      <Title level={5}>{model.date}</Title>
    </Card>
  );
};

export default DataModelCard;
