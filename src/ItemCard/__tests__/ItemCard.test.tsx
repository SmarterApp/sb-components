import * as React from "react";
import { shallow } from "enzyme";
import { ItemCard, ItemCardModel, GradeLevels } from "@src/index";
import { itemCardProps } from "@mocks/index";

describe("ItemCard", () => {
  const wrapper = shallow(<ItemCard {...itemCardProps} />);

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
