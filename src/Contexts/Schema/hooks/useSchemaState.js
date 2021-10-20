import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import { useDID } from "../../DID/DIDContext";
import moment from "moment";
import { TileDocument } from "@ceramicnetwork/stream-tile";

const baseSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
};

export const useSchemaState = () => {
  const [properties, setProperties] = useState({});
  const [required, setRequired] = useState([]);
  const [schema, setSchema] = useState(baseSchema);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { selfID, modelManager, isAuthenticated, resetModelManager } = useDID();
  const [schemasList, setSchemasList] = useState([]);
  const [modelsList, setModelsList] = useState([]);

  const saveSchema = async () => {
    const schemaID = await modelManager.createSchema(schema.title, schema);
    let mySchemas = await selfID.get("mySchemas");
    if (!mySchemas) {
      mySchemas = {};
      mySchemas.headers = [];
    }
    mySchemas.headers.unshift({
      title: schema.title,
      description: schema.description,
      date: moment().format("ll"),
      streamID: schemaID,
    });
    await selfID.set("mySchemas", mySchemas);
    setSchema(baseSchema);
    navigate("/schemas");
  };
  const getSchemas = async () => {
    if (isAuthenticated) {
      let schemas = await selfID.get("mySchemas");
      if (!schemas) {
        schemas = {};
        schemas.headers = [];
      }
      setSchemasList(schemas.headers);
    }
  };
  const getSchemaByID = async (streamID) => {
    if (isAuthenticated) {
      let stream = await selfID.ceramic.loadStream(streamID);
      return stream;
    }
  };
  const getModelByID = async (streamID) => {
    if (isAuthenticated) {
      let stream = await selfID.ceramic.loadStream(streamID);
      return stream;
    }
  };
  const publishModel = async (evt) => {
    const [title, streamID] = evt.schema.split("-");
    console.log(title);
    console.log(streamID);
    let stream = await selfID.ceramic.loadStream(streamID);
    console.log(
      await modelManager.usePublishedSchema(title, stream.allCommitIds[0])
    );
    let schemaURL = modelManager.getSchemaURL(streamID);
    console.log(schemaURL);
    await modelManager.createDefinition(evt.name, {
      name: evt.name,
      description: evt.description,
      schema: schemaURL,
    });
    console.log(modelManager);
    const model = await modelManager.toPublished();
    console.log(model);
    const doc = await TileDocument.create(selfID.ceramic, model);
    console.log(doc);
    const id = doc.id.toString();
    let datamodels = await selfID.get("myDataModels");
    if (!datamodels) {
      datamodels = {};
      datamodels.headers = [];
    }
    datamodels.headers.unshift({
      title: evt.title,
      streamID: id,
      description: evt.modelDescription,
      date: moment().format("ll"),
    });
    await selfID.set("myDataModels", datamodels);
    resetModelManager();
    navigate("/data-models");
  };
  const getModels = async () => {
    if (isAuthenticated) {
      let models = await selfID.get("myDataModels");
      if (!models) {
        models = {};
        models.headers = [];
      }
      setModelsList(models.headers);
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleOk = (propertyName) => {
    setProperties((prev) => ({ [propertyName]: {}, ...prev }));
    setIsModalVisible(false);
  };
  const showModal = () => setIsModalVisible(true);
  const handleChangeSchema = (evt) => {
    setSchema((prevSchema) => {
      return {
        ...prevSchema,
        [evt.target.name]: evt.target.value,
      };
    });
  };
  useEffect(() => {
    setSchema((prevSchema) => ({
      ...prevSchema,
      properties,
      required,
    }));
  }, [properties, required]);
  useEffect(() => {
    console.log(schema);
  }, [schema]);

  return {
    setProperties,
    setRequired,
    handleChangeSchema,
    isModalVisible,
    handleCancel,
    handleOk,
    showModal,
    properties,
    schema,
    saveSchema,
    getSchemas,
    schemasList,
    getSchemaByID,
    publishModel,
    modelsList,
    getModels,
    getModelByID,
  };
};
