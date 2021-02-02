import * as React from "react";
import { storiesOf } from "@storybook/react";
import { MultiSelect } from "../../src/Select/MultiSelect";
import { centerDecorator } from "../CenterDecorator";
import { MultiSelectValue } from "../../src/Select/SelectModel";

const handleValueChange = (v: MultiSelectValue[]) => {
  console.log("chnage in storybook", v[0].value);
};

export const multiSelectOptions: MultiSelectValue[] = [
  {
    value: "tb_in",
    label: "EBAE Contracted",
    disabled: true,
    selected: false
  },
  {
    value: "xy_zb",
    label: "EBAE with Nemeth Uncontracted",
    disabled: false,
    selected: false
  },
  {
    value: "op_gh",
    label: "EBAE with Nemeth Contracted",
    disabled: true,
    selected: false
  },
  {
    value: "xy_zb_2",
    label: "EBAE with Nemeth Uncontracted",
    disabled: false,
    selected: false
  }
];

storiesOf("Select", module)
  .addDecorator(centerDecorator)
  .add("MultiSelect Dropdown", () => (
    <>
      <MultiSelect
        options={multiSelectOptions}
        onChange={handleValueChange}
        uniqueId={6000}
      />
    </>
    // <MultiSelect options={multiSelectOptions} onChange={handleValueChange} uniqueId={6010}/></>
  ));
