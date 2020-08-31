import * as React from "react";
import { storiesOf } from "@storybook/react";
import { MultiSelect } from "../../src/Select/MultiSelect";
import { centerDecorator } from "../CenterDecorator";

storiesOf("Select", module)
  .addDecorator(centerDecorator)
  .add("MultiSelect Dropdown", () => <MultiSelect message="hi" />);
