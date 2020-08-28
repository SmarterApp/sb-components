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

  onMusltiSelect = (v: MultiselectValue[]) => {};

  handleChangedBrailleType = (v: MultiselectValue[]) => {
    //change in item itself
    if (this.props.item !== undefined) {
      if (this.props.item.selectedBrailleTypes === undefined)
        this.props.item.selectedBrailleTypes = [];
      if (this.props.item.selectedBrailleTypes.indexOf(v[0].value) === -1) {
        this.props.item.selectedBrailleTypes.push(v[0].value);
        console.log(
          "****hahahahahhaha finally>>>>",
          this.props.item.selectedBrailleTypes
        );
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
