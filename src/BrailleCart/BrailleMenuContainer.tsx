import * as React from "react";
import { ItemCardModel } from "@src/index";
import "@src/Assets/Styles/braille-cart.less";
import { BrailleCartMenu } from "./BrailleCartMenu";
import { Multiselect, MultiselectValue } from "react-bootstrap-multiselect-ts";
import {
  getBrailleDowndrownOptions,
  brailleDropdownOptions
} from "./BrailleCart";

export interface BrailleMenuContainerProps {
  itemsInCart: ItemCardModel[];
  associatedItemsInPrintCart?: ItemCardModel[];
}

export interface BrailleMenuContainerState {
  selectedBrailleType: { [key: number]: string[] };
}

export class BrailleMenuContainer extends React.Component<
  BrailleMenuContainerProps,
  BrailleMenuContainerState
> {
  constructor(props: BrailleMenuContainerProps) {
    super(props);
    this.state = {
      selectedBrailleType: {}
    };
  }

  handleApplyAll = (v: MultiselectValue[]) => {};

  renderBrailleMenu = () => {
    const itemsInCart = this.props.itemsInCart;
    let brailleMenu = null;
    brailleMenu = itemsInCart.map(item => <BrailleCartMenu item={item} />);
    return brailleMenu;
  };

  render() {
    return (
      <div>
        <Multiselect
          multiple
          data={getBrailleDowndrownOptions(
            brailleDropdownOptions,
            [],
            [],
            true
          )}
          numberDisplayed={1}
          onChange={this.handleApplyAll}
          buttonWidth="150px"
          tabIndex={0}
        />
        <table className="braille-menu-table">
          <thead>
            <tr>
              <th>Item Id</th>
              <th>Braille Options</th>
            </tr>
          </thead>
          <tbody>{this.renderBrailleMenu()}</tbody>
        </table>
      </div>
    );
  }
}
