import * as React from "react";
import { ItemCardModel } from "@src/index";
import "@src/Assets/Styles/braille-cart.less";
import { BrailleCartMenu } from "./BrailleCartMenu";
import { Multiselect, MultiselectValue } from "react-bootstrap-multiselect-ts";
import {
  getBrailleDowndrownOptions,
  brailleDropdownOptions,
  getBrailleLabelFromCode,
  getAssociatedItems
} from "./BrailleCart";

export interface BrailleMenuContainerProps {
  itemsInCart: ItemCardModel[];
  associatedItemsInPrintCart?: ItemCardModel[];
}

export interface BrailleMenuContainerState {
  selectedBrailleType: { [key: number]: string[] };
  selectedBrailleTypes?: string[];
}

export class BrailleMenuContainer extends React.Component<
  BrailleMenuContainerProps,
  BrailleMenuContainerState
> {
  constructor(props: BrailleMenuContainerProps) {
    super(props);
    this.state = {
      selectedBrailleType: {},
      selectedBrailleTypes: []
    };
  }

  handleApplyAll = (v: MultiselectValue[]) => {
    debugger;

    //Check if option get selected
    if (v[0].selected && v[0].selected === true) {
      if (this.state.selectedBrailleTypes === undefined)
        this.setState({ selectedBrailleTypes: [] });
      else if (this.state.selectedBrailleTypes.indexOf(v[0].value) === -1) {
        this.state.selectedBrailleTypes.push(v[0].value);
      }
    } else {
      //else - option is unselected
      if (this.state.selectedBrailleTypes !== undefined) {
        if (this.state.selectedBrailleTypes.indexOf(v[0].value) !== -1) {
          const filteredSelectedBrailleType = this.state.selectedBrailleTypes.filter(
            option => option != v[0].value
          );
          this.setState({ selectedBrailleTypes: filteredSelectedBrailleType });
        }
        //check if selected Braille array for an item is empty,
        // make it undefined if it is empty
        if (this.state.selectedBrailleTypes.length <= 0) {
          this.setState({ selectedBrailleTypes: undefined });
        }
      }
    }
  };

  renderBrailleMenu = () => {
    const itemsInCart = this.props.itemsInCart;
    let brailleMenu = null;
    brailleMenu = itemsInCart.map(item => (
      <BrailleCartMenu
        item={item}
        associatedItemsInPrintCart={this.props.associatedItemsInPrintCart}
      />
    ));

    return brailleMenu;
  };

  applyBrailleTypeToAll = () => {
    debugger;
    this.props.itemsInCart.forEach(element => {
      element.selectedBrailleTypes = this.state.selectedBrailleTypes;
    });
    this.forceUpdate();
  };

  render() {
    return (
      <div>
        <div className="brailleOptionContainer">
          <b>Braille Options : </b>
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
          />{" "}
          &nbsp;
          <a className="" onClick={this.applyBrailleTypeToAll}>
            Apply to all
          </a>
        </div>

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
