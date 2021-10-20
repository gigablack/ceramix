import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import { useSchema } from "../Contexts/Schema/SchemaContext";
import ReactJson from "react-json-view";

const { Title } = Typography;

const SchemaDetails = ({ streamID }) => {
  const [schema, setSchema] = useState({});
  const { getSchemaByID } = useSchema();
  useEffect(() => {
    (async () => {
      setSchema(await getSchemaByID(streamID));
    })();
  }, []);
  return (
    <>
      <Title style={{ textAlign: "center" }}>Schema Details</Title>
      <ReactJson src={schema?.content} />
    </>
  );
};

export default SchemaDetails;
