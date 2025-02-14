export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    reset,
  };
};
import { useState, useEffect } from "react";
import axios from "axios";

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);
  console.log(baseUrl);

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setResources(response.data);
    });
  }, [baseUrl]);
  console.log(resources);
  const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject);
    setResources(resources.concat(response.data));
  };

  return [resources, { create }];
};
