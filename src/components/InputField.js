import React from "react";
import CountrySelector from "./CountrySelector";

const InputField = (e) => {
  const { id, label, data } = e;
  return (
    <div>
      <label className="form-control-label" htmlFor={id}>
        {label}
      </label>
      {id === "phone" ? (
        <CountrySelector data={data} />
      ) : (
        <input
          className="form-control form-control-alternative"
          type="text"
          id={id}
          defaultValue={data}
        />
      )}
    </div>
  );
};

export default InputField;
