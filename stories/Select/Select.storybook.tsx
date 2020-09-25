import * as React from "react";
import { storiesOf } from "@storybook/react";
import { MultiSelect } from "../../src/Select/MultiSelect";
import { centerDecorator } from "../CenterDecorator";
import {
  multiSelectOptions,
  MultiSelectValue
} from "../../src/Select/SelectModel";

const handleValueChange = (v: MultiSelectValue[]) => {
  console.log("chnage in storybook", v[0].value);
};

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
