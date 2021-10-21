import React, { useEffect } from "react";
import { Typography } from "antd";
import { useSchema } from "../Contexts/Schema/SchemaContext";
import DataModelCard from "../components/DataModelCard/DataModelCard";
import { useDID } from "../Contexts/DID/DIDContext";

const { Title } = Typography;
// styles
const IndexPage = () => {
  const { appModelsList, getAppModels } = useSchema();
  const { isAppAthenticated } = useDID();
  useEffect(() => {
    if (isAppAthenticated) getAppModels();
  }, [isAppAthenticated]);
  return (
    <>
      <Title style={{ textAlign: "center" }}>Community Data Models</Title>
      {appModelsList?.map((model) => (
        <DataModelCard key={model.streamID} model={model} />
      ))}
    </>
  );
};

export default IndexPage;
