import React from "react";
import { Form, Field, FormSpy } from "react-final-form";
import "./Form.css";

const MyForm = ({ fields, initialValues }) => {
  console.log("Fields:", fields);

  const handleSubmit = (values) => {
    // Log the form values to the console
    console.log("Form values:", values);
  };

  const required = (value) => (value ? undefined : "Required");

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
          <FormSpy subscription={{ values: true }}>
            {({ values }) => <pre>{JSON.stringify(values, undefined, 2)}</pre>}
          </FormSpy>
        </form>
      )}
    />
  );
};

export default MyForm;
