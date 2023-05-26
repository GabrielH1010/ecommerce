import React from "react";
import { NumericFormat } from "react-number-format";

import { StyledInput } from "./styles";

function Input({
  icon,
  type,
  placeholder,
  mask,
  numeric,
  price,
  value,
  onChange,
  width,
  disabled,
  marginVertical,
  onFocus,
  name,
}) {
  const inputType = numeric ? "tel" : type;

  const handleNumericChange = (values) => {
    const { floatValue } = values;
    onChange({ target: { name, value: floatValue } });
  };

  return (
    <div>
      <StyledInput
        icon={icon && true}
        width={width}
        marginVertical={marginVertical}
      >
        <div>{icon}</div>
        {numeric ? (
          <NumericFormat
            name={name}
            id={name}
            value={value}
            onValueChange={handleNumericChange}
            prefix={price ? "R$ " : ""}
            thousandSeparator="."
            placeholder={placeholder}
            decimalSeparator=","
            decimalScale={price && 2}
            fixedDecimalScale={price}
            onFocus={onFocus}
          />
        ) : (
          <input
            name={name}
            id={name}
            value={value}
            disabled={disabled}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete="new-password"
            type={inputType}
            onFocus={onFocus}
          />
        )}
      </StyledInput>
    </div>
  );
}

export default Input;
