// import "./styles.css";
import MyForm from "./Components/Form";
import React from "react";

const App = () => {
  const fields = [
    { name: "field1", label: "Name", type: "text" },
    { name: "field2", label: "Last Name", type: "text" },
  ];

  return (
    <div>
      <MyForm fields={fields} initialValues={{}} />
    </div>
  );
};

export default App;
