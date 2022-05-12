import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function CountrySelector(props) {
  const [code, setCode] = useState(props.value);
  return (
    <PhoneInput
      inputStyle={{
        fontSize: "0.875rem",
        height: "calc(2.75rem + 2px)",
        width: "100%",
        color: "black !important",
      }}
      defaultCountry="ca"
      value={code}
      onChange={(e) => setCode(e)}
      inputExtraProps={{
        name: "phone",
        required: true,
        autoFocus: true,
      }}
    />
  );
}

export default CountrySelector;
