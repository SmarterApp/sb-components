import * as React from "react";
import { storiesOf } from "@storybook/react";
import { CenterDecorator } from "../CenterDecorator";
import { action } from "@storybook/addon-actions";

storiesOf("Style", module)
  .addDecorator(CenterDecorator)
  .add("Buttons", () => (
    <div>
      <button className="btn btn-white">btn-white</button>
      <button className="btn btn-blue">btn-blue</button>
      <button className="btn btn-green">btn-green</button>
      <button className="btn btn-gray">btn-gray</button>
      <button className="btn btn-primary">btn-primary</button>
      <button className="btn btn-success">btn-success</button>
      <button className="item-nav-btn btn btn-link">item-nav-btn</button>
      <a className="btn btn-link" role="button" onClick={action("Clicked")}>
        btn-link
      </a>
    </div>
  ))
  .add("Buttons Disabled", () => (
    <div>
      <button disabled className="btn btn-white">
        btn-white
      </button>
      <button disabled className="btn btn-blue">
        btn-blue
      </button>
      <button disabled className="btn btn-green">
        btn-green
      </button>
      <button disabled className="btn btn-gray">
        btn-gray
      </button>
      <button disabled className="btn btn-primary">
        btn-primary
      </button>
      <button disabled className="btn btn-success">
        btn-success
      </button>
      <button disabled className="item-nav-btn btn btn-link">
        item-nav-btn
      </button>
    </div>
  ))
  .add("Buttons Sizes", () => (
    <div>
      <button className="btn btn-sm btn-blue">btn-sm</button>
      <button className="btn btn-gray">btn-gray</button>
      <button className="btn btn-lg btn-green">btn-lg</button>
    </div>
  ));
