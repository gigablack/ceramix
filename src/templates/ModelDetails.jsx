import React, { useState, useEffect } from "react";
import { Typography, Button } from "antd";
import ReactJson from "react-json-view";
import { useSchema } from "../Contexts/Schema/SchemaContext";
import { saveAs } from "file-saver";

const { Title } = Typography;

const ModelDetails = ({ streamID }) => {
  const [model, setModel] = useState(null);
  const { getModelByID } = useSchema();
  const handleDownload = () => {
    if (model) {
      let blob = new Blob([JSON.stringify(model.content)], {
        type: "application/json;charset=utf-8",
      });
      saveAs(blob, "model.json");
    }
  };
  useEffect(() => {
    (async () => {
      setModel(await getModelByID(streamID));
    })();
  }, []);
  return (
    <>
      <Title>Model Details</Title>
      <Button
        type="primary"
        style={{ marginBottom: "1em" }}
        onClick={handleDownload}
      >
        Download JSON
      </Button>
      <ReactJson src={model?.content} />
    </>
  );
};

export default ModelDetails;
