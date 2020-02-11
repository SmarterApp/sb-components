import * as React from "react";
import * as $ from "jquery";
import { storiesOf } from "@storybook/react";
import { centerDecorator } from "../CenterDecorator";
import { routerDecorator } from "../RouterDecorator";
import { completeItemCard, itemCardProps } from "@mocks/ItemCard/mocks";
import { ItemCardCondensed, ItemCard } from "@src/index";

storiesOf("Item Card", module)
  .addDecorator(routerDecorator)
  .addDecorator(centerDecorator)
  .add("Item Card", () => <ItemCard {...itemCardProps} />)
  .add("Item Card Condensed", () => (
    <ItemCardCondensed {...completeItemCard} />
  ));
