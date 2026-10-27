import { useState } from "react";

export const useDemoForm = (initialValues, { resetOnSave = false } = {}) => {
  const [values, setValues] = useState(initialValues);
  const [savedValues, setSavedValues] = useState(initialValues);
  const [saved, setSaved] = useState(false);

  const setField = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setField(name, type === "checkbox" ? checked : value);
  };

  const reset = () => {
    setValues(savedValues);
    setSaved(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const next = resetOnSave ? initialValues : values;
    setValues(next);
    setSavedValues(next);
    setSaved(true);
  };

  return { values, saved, setField, handleChange, reset, handleSubmit };
};
