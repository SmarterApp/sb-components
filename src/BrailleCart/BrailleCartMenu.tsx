import * as React from "react";
import { ItemCardModel } from "@src/index";
import "@src/Assets/Styles/braille-cart.less";
import { Multiselect, MultiselectValue } from "react-bootstrap-multiselect-ts";
import {
  brailleDropdownOptions,
  getBrailleDowndrownOptions
} from "./BrailleCart";

export interface BrailleCartMenuProps {
  item: ItemCardModel;
}

export class BrailleCartMenu extends React.Component<BrailleCartMenuProps> {
  constructor(props: BrailleCartMenuProps) {
    super(props);
    this.state = {
      selectedBrailleType: {}
    };
  }

  handleChangedBrailleType = (v: MultiselectValue[]) => {
    //Check if option get selected
    if (v[0].selected && v[0].selected === true) {
      if (this.props.item !== undefined) {
        if (this.props.item.selectedBrailleTypes === undefined)
          this.props.item.selectedBrailleTypes = [];
        if (this.props.item.selectedBrailleTypes.indexOf(v[0].value) === -1) {
          this.props.item.selectedBrailleTypes.push(v[0].value);
        }
      }
    } else {
      //else - option is unselected
      if (this.props.item !== undefined) {
        if (this.props.item.selectedBrailleTypes !== undefined) {
          if (this.props.item.selectedBrailleTypes.indexOf(v[0].value) !== -1) {
            const filteredSelectedBrailleType = this.props.item.selectedBrailleTypes.filter(
              option => option != v[0].value
            );
            this.props.item.selectedBrailleTypes = filteredSelectedBrailleType;
          }
          //check if selected Braille array for an item is empty,
          // make it undefined if it is empty
          if (this.props.item.selectedBrailleTypes.length <= 0) {
            this.props.item.selectedBrailleTypes = undefined;
          }
        }
      }
    }
  };

  renderBrailleMenu = () => {
    const item = this.props.item;
    return (
      <tr>
        <td>{item.itemKey}</td>
        <td>
          <Multiselect
            multiple
            data={getBrailleDowndrownOptions(
              brailleDropdownOptions,
              item.availableBrailleTypes,
              item.selectedBrailleTypes !== undefined
                ? item.selectedBrailleTypes
                : []
            )}
            numberDisplayed={1}
            onChange={this.handleChangedBrailleType}
            selectAllText="Select all"
          />
        </td>
      </tr>
    );
  };

  render() {
    return <>{this.renderBrailleMenu()}</>;
  }
}
