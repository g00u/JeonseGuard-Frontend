import React from "react";
import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [radioValue, setRadioValue] = useState("");
  const [imageFile, setImageFile] = useState(null);

  return (
    <FormContext.Provider value={{ radioValue, setRadioValue, imageFile, setImageFile }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
