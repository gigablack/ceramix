import React, { useEffect } from "react";
import { Link } from "gatsby";
import { Typography, Button } from "antd";
import { useSchema } from "../Contexts/Schema/SchemaContext";
import DataModelCard from "../components/DataModelCard/DataModelCard";
import { useRedirect } from "../hooks/useRedirect";

const { Title } = Typography;

const DataModelsPage = () => {
  useRedirect();
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
          <DataModelCard key={model.streamID} model={model} />
        ))}
      </section>
    </>
  );
};

export default DataModelsPage;
