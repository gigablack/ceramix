import React, { createContext, useContext } from "react";
import { useSchemaState } from "./hooks/useSchemaState";

const initialState = {
  setProperties: () => {},
  setRequired: () => {},
  handleChangeSchema: () => {},
  isModalVisible: false,
  handleCancel: () => {},
  handleOk: () => {},
  showModal: () => {},
  properties: {},
  schema: {},
  saveSchema: () => {},
  getSchemas: () => {},
  schemasList: [],
    modelsList: [],
    getSchemaByID: () => {},
    publishModel: () => {},
    getModels: () => {},
    getModelByID: () => {},
};

const SchemaContext = createContext(initialState);

export const useSchema = () => {
  return useContext(SchemaContext);
};

export const SchemaContextProvider = ({ children }) => {
  const state = useSchemaState();
  return (
    <SchemaContext.Provider value={state}>{children}</SchemaContext.Provider>
  );
};
