import React from "react";
import { Select } from "antd";

interface ISelectOption {
  id: string;
  label: string;
}

interface IFieldSelectProps {
  placeholder: string;
  value: string;
  onChange: any;
  options: Array<ISelectOption>;
}
const FieldSelect: React.FC<IFieldSelectProps> = ({ placeholder, value, onChange, options }) => (
  <Select placeholder={placeholder} value={value} onChange={onChange}>
    {options.map((o: ISelectOption) => (
      <Select.Option key={o.id} value={o.id}>
        {o.label}
      </Select.Option>
    ))}
  </Select>
);

export default FieldSelect;
