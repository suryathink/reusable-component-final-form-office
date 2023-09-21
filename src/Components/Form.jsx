import React, { useState, useEffect } from "react";
import { Form, Field, FormSpy } from "react-final-form";
import "./Form.css";
import CustomModal from "../Components/CustomModel";

const MyForm = ({ fields, initialValues }) => {
  const [formModified, setFormModified] = useState(false);
  const [showModal, setShowModal] = useState(false);

  console.log("Fields:", fields);

  const handleBeforeUnload = (e) => {
    if (formModified) {
      e.preventDefault();
      e.returnValue =
        "You have unsaved changes. Are you sure you want to leave?";
      setShowModal(true); // Display the custom modal
    }
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (values) => {
    console.log("Form values:", values);

    setFormModified(false);
  };

  const required = (value) => {
    setFormModified(true);
    return value ? undefined : "Required";
  };


  useEffect(() => {
    
    const handleBeforeUnload = (event) => {
      if (formModified) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [formModified]);



  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      subscription={{
        submitting: true,
      }}
      render={({ handleSubmit, values, submitting }) => (
        <form className="my-form" onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <div key={index}>
              <Field
                name={field.name}
                validate={required}
                placeholder={`Enter ${field.label}`}
                type={field.type}
                className="my-input"
                subscription={{
                  value: true,
                  active: true,
                  error: true,
                  touched: true,
                }}
              >
                {({ input, meta, placeholder }) => (
                  <div>
                    <label>{field.label}</label>
                    <input {...input} placeholder={placeholder} />
                    {meta.error && meta.touched && <span> {meta.error}</span>}
                  </div>
                )}
              </Field>
            </div>
          ))}
          <button type="submit" className="my-button" disabled={submitting}>
            Submit
          </button>
          {showModal && (
            <CustomModal
              message="You have unsaved changes. Are you sure you want to leave?"
              onClose={handleCloseModal}
            />
          )}
          <FormSpy subscription={{ values: true }}>
            {({ values }) => <pre>{JSON.stringify(values, undefined, 2)}</pre>}
          </FormSpy>
        </form>
      )}
    />
  );
};

export default MyForm;
