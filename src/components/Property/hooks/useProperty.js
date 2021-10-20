import React, { useState, useEffect } from "react";
import { useSchema } from "../../../Contexts/Schema/SchemaContext";

export const useProperty = (propName) => {
  const { setRequired: setRequiredArray, setProperties } = useSchema();

  const [key, setKey] = useState(propName);
  const [prevKey, setPrevKey] = useState(propName);
  const [type, setType] = useState("string");
  const [required, setRequired] = useState(true);
  const [prop, setProp] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleOk = (name) => {
    if (name === key) {
      setIsModalVisible(false);
      deleteProp();
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleKeyChange = (evt) => {
    setKey((lastKey) => {
      setPrevKey(lastKey);
      return evt.target.value;
    });
  };
  const handleTextChange = (evt) => {
    setProp((prev) => {
      if (!evt.target.value) {
        delete prev[evt.target.name];
        return prev;
      } else {
        return {
          ...prev,
          [evt.target.name]: evt.target.value,
        };
      }
    });
  };
  const handleNumChange = (num, name) => {
    setProp((prev) => {
      if (!num) {
        delete prev[name];
        return prev;
      } else {
        return {
          ...prev,
          [name]: num,
        };
      }
    });
  };
  const deleteProp = () => {
    setProperties((prev) => {
      const newProp = Object.assign({}, prev);
      delete newProp[key];
      return newProp;
    });
    setRequiredArray((prevArray) => {
      const newArray = [...prevArray];
      const ind = newArray.indexOf(key);
      newArray.splice(ind, 1);
      return newArray;
    });
  };
  useEffect(() => {
    setRequiredArray((prevArray) => {
      if (required) {
        if (prevArray.includes(key)) {
          return prevArray;
        } else {
          return [...prevArray, key];
        }
      } else {
        const ind = prevArray.indexOf(key);
        const newArray = [...prevArray];
        newArray.splice(ind, 1);
        return newArray;
      }
    });
    setProperties((prev) => ({
      ...prev,
      [key]: { ...prop, type },
    }));
  }, [prop, required]);
  useEffect(() => {
    setProp((prevProp) => {
      const newProp = {};
      if (prevProp["title"]) newProp.title = prevProp["title"];
      if (prevProp["description"])
        newProp.description = prevProp["description"];
      return newProp;
    });
  }, [type]);
  useEffect(() => {
    setProperties((prev) => {
      if (key === prevKey) return prev;
      const newProp = Object.assign({}, prev);
      delete newProp[prevKey];
      newProp[key] = { ...prop, type };
      return newProp;
    });
    setRequiredArray((prevArray) => {
      const ind = prevArray.indexOf(prevKey);
      if (ind === -1) {
        return [...prevArray, key];
      } else {
        const newArray = [...prevArray];
        newArray.splice(ind, 1);
        newArray.push(key);
        return newArray;
      }
    });
  }, [key, prevKey]);

  return {
    setType,
    setRequired,
    handleKeyChange,
    required,
    key,
    type,
    handleTextChange,
    handleNumChange,
    isModalVisible,
    handleCancel,
    handleOk,
    showModal,
  };
};
