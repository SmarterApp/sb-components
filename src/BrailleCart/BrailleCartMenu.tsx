import * as React from "react";
import { ItemCardModel, ToolTip, MultiSelectValue } from "@src/index";
import "@src/Assets/Styles/braille-cart.less";
// import { Multiselect, MultiselectValue } from "react-bootstrap-multiselect-ts";
import {
  getAssociatedItems,
  ptItemsToolTipMessage,
  getBrailleOptions
} from "./BrailleCart";
import { MultiSelect } from "@src/Select/MultiSelect";

export interface BrailleCartMenuProps {
  item: ItemCardModel;
  associatedItemsInPrintCart?: ItemCardModel[];
  index: number;
}

export class BrailleCartMenu extends React.Component<BrailleCartMenuProps> {
  constructor(props: BrailleCartMenuProps) {
    super(props);
    this.state = {
      selectedBrailleType: {}
    };
  }

  handleChangedBrailleType = (v: MultiSelectValue[]) => {
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

  ptItemsToolTipMessage = () => {
    return <span>{ptItemsToolTipMessage}</span>;
  };

  renderSelectedBrailleForPtItems = () => {
    const item = this.props.item;
    let jsxForAssociatedItems: any;
    if (item.isPerformanceItem) {
      const associatedItems = getAssociatedItems(
        item,
        this.props.associatedItemsInPrintCart
      );
      if (associatedItems.length > 0) {
        jsxForAssociatedItems = associatedItems.map(element => (
          <>
            <tr className="pt-items-row">
              <td>
                <ToolTip
                  helpText={this.ptItemsToolTipMessage()}
                  displayText={element.itemKey}
                  position="bottom"
                  displayIcon={true}
                  key={element.itemKey}
                />
              </td>
              <td />
            </tr>
          </>
        ));
      }
    }
    return jsxForAssociatedItems;
  };

  renderBrailleMenu = () => {
    const item = this.props.item;
    return (
      <>
        <tr>
          <td tabIndex={0}>{item.itemKey}</td>
          <td>
            {/* <label htmlFor={"dropdownMenuButton" + this.props.index} /> */}
            <MultiSelect
              options={getBrailleOptions(item)}
              onChange={this.handleChangedBrailleType}
              uniqueId={this.props.index}
            />
          </td>
        </tr>
        {this.renderSelectedBrailleForPtItems()}
      </>
    );
  };

  render() {
    return <>{this.renderBrailleMenu()}</>;
  }
}
