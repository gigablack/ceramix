import React, { createContext, useContext, useState, useEffect } from "react";
import { EthereumAuthProvider, SelfID } from "@self.id/web";
import { CeramicClient } from "@ceramicnetwork/http-client";
import { ModelManager } from "@glazed/devtools";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { fromString } from "uint8arrays";
import { DataModel } from "@glazed/datamodel";
import { DIDDataStore } from "@glazed/did-datastore";
import ceramixModel from "../../models/ceramixModel.json";

const DIDContext = createContext();

const useDIDSetup = () => {
  const [selfID, setSelfID] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [appClient, setAppClient] = useState(null);
  const [modelManager, setModelManager] = useState(null);

  const authenticate = async () => {
    setIsLoading(true);
    const addr = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAddresses(addr);
    const self = await SelfID.authenticate({
      ceramic: process.env.GATSBY_CERAMIC_NODE,
      authProvider: new EthereumAuthProvider(window.ethereum, addr[0]),
      connectNetwork: "testnet-clay",
    });
    const model = new DataModel({
      ceramic: self.client.ceramic,
      model: ceramixModel,
    });
    const store = new DIDDataStore({ ceramic: self.client.ceramic, model });
    setProfile(await store.get("basicProfile"));
    setSelfID(store);
    const seed = fromString(process.env.GATSBY_DID_KEY, "base16");
    const did = new DID({
      provider: new Ed25519Provider(seed),
      resolver: getResolver(),
    });
    await did.authenticate();
    const app = new CeramicClient(process.env.GATSBY_CERAMIC_NODE);
    app.did = did;
    setAppClient(app);
    const manager = new ModelManager(app);
    setModelManager(manager);
    setIsLoading(false);
  };

  const resetModelManager = () => {
    setModelManager(new ModelManager(appClient));
  };

  useEffect(() => {
    if (profile) setIsAuthenticated(true);
  }, [profile]);

  return {
    selfID,
    addresses,
    isAuthenticated,
    authenticate,
    profile,
    isLoading,
    modelManager,
    appClient,
    resetModelManager,
  };
};

export const useDID = () => {
  return useContext(DIDContext);
};

export const DIDContextProvider = ({ children }) => {
  const did = useDIDSetup();
  return <DIDContext.Provider value={did}>{children}</DIDContext.Provider>;
};
