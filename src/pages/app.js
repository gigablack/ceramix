import React from "react";
import { Router } from "@reach/router";
import SchemaDetails from "../templates/SchemaDetails";
import ModelDetails from "../templates/ModelDetails";

const App = () => {
  return (
    <Router basepath="/app">
      <SchemaDetails path="/schemas/:streamID" />
      <ModelDetails path="/models/:streamID" />
    </Router>
  );
};

export default App;
