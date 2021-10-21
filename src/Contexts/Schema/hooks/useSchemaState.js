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
  const { selfID, modelManager, isAuthenticated, resetModelManager, appDID } =
    useDID();
  const [schemasList, setSchemasList] = useState([]);
  const [modelsList, setModelsList] = useState([]);
  const [appModelsList, setAppModelsList] = useState([]);
  const [savingSchema, setSavingSchema] = useState(false);
  const [publishingModel, setPublishingModel] = useState(false);

  const saveSchema = async () => {
    setSavingSchema(true);
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
    setSavingSchema(false);
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
      return await selfID.ceramic.loadStream(streamID);
    } else {
      return await appDID.ceramic.loadStream(streamID);
    }
  };
  const publishModel = async (evt) => {
    setPublishingModel(true);
    const [title, streamID] = evt.schema.split("-");
    let stream = await selfID.ceramic.loadStream(streamID);
    await modelManager.usePublishedSchema(title, stream.allCommitIds[0]);
    let schemaURL = modelManager.getSchemaURL(streamID);
    await modelManager.createDefinition(evt.name, {
      name: evt.name,
      description: evt.description,
      schema: schemaURL,
    });
    const model = await modelManager.toPublished();
    const doc = await TileDocument.create(selfID.ceramic, model);
    const id = doc.id.toString();
    let datamodels = await selfID.get("myDataModels");
    let appDataModels = await appDID.get("models");
    if (!datamodels) {
      datamodels = {};
      datamodels.headers = [];
    }
    if (!appDataModels) {
      appDataModels = {};
      appDataModels.headers = [];
    }
    const dataModelInfo = {
      title: evt.title,
      streamID: id,
      description: evt.modelDescription,
      date: moment().format("ll"),
    };
    const appDataModelInfo = {
      ...dataModelInfo,
      author: selfID.id,
    };
    datamodels.headers.unshift(dataModelInfo);
    appDataModels.headers.unshift(appDataModelInfo);
    await selfID.set("myDataModels", datamodels);
    await appDID.set("models", appDataModels);
    resetModelManager();
    setPublishingModel(false);
    navigate("/data-models");
  };
  const getAppModels = async () => {
    let models = await appDID.get("models");
    if (!models) {
      models = {};
      models.headers = [];
    }
    setAppModelsList(models.headers);
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
    getAppModels,
    appModelsList,
    savingSchema,
    publishingModel,
  };
};
