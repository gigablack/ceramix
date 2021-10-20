import React, { useEffect } from "react";
import { Link } from "gatsby";
import { Typography, Button, Card } from "antd";
import { useSchema } from "../Contexts/Schema/SchemaContext";

const { Title } = Typography;

const DataModelsPage = () => {
  const { modelsList, getModels } = useSchema();
  useEffect(() => {
    getModels();
  }, []);
  return (
    <>
      <Title>Data Models</Title>
      <Link to="/new-datamodel">
        <Button style={{ marginBottom: "1em" }} type="primary">
          New Data Model
        </Button>
      </Link>
      <section style={{ display: "flex", flexWrap: "wrap" }}>
        {modelsList?.map((model) => (
          <Card
            style={{ width: 500, margin: "auto" }}
            key={model.streamID}
            title={model.title}
            extra={<Link to={`/app/models/${model.streamID}`}>View JSON</Link>}
          >
            <p>{model.description}</p>
            <Title level={5}>{model.date}</Title>
          </Card>
        ))}
      </section>
    </>
  );
};

export default DataModelsPage;
