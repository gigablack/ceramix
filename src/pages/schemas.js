import React, { useEffect } from "react";
import { Typography, Button, Card } from "antd";
import { Link } from "gatsby";
import { useSchema } from "../Contexts/Schema/SchemaContext";
import { useRedirect } from "../hooks/useRedirect";

const { Title } = Typography;

const SchemasPage = () => {
  useRedirect();
  const { schemasList, getSchemas } = useSchema();

  useEffect(() => {
    getSchemas();
  }, []);
  return (
    <>
      <Title style={{ textAlign: "center" }}>My Schemas</Title>
      <Link to="/new-schema">
        <Button style={{ marginBottom: "1em" }} type="primary">
          New Schema
        </Button>
      </Link>
      <section style={{ display: "flex", flexWrap: "wrap" }}>
        {schemasList?.map((schema) => (
          <Card
            style={{
              marginBottom: "1em",
              width: 500,
              marginLeft: "auto",
              marginRight: "auto",
            }}
            title={schema.title}
            key={`${schema.title}-${schema.date}`}
            extra={<Link to={`/app/schemas/${schema.streamID}`}>Details</Link>}
          >
            <p>{schema.description}</p>
          </Card>
        ))}
      </section>
    </>
  );
};

export default SchemasPage;
