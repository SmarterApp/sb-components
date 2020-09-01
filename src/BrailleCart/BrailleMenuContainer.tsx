import * as React from "react";
import { ItemCardModel } from "@src/index";
import "@src/Assets/Styles/braille-cart.less";
import { BrailleCartMenu } from "./BrailleCartMenu";
import { Multiselect, MultiselectValue } from "react-bootstrap-multiselect-ts";
import {
  getBrailleDowndrownOptions,
  brailleDropdownOptions,
  getBrailleLabelFromCode,
  getAssociatedItems,
  getBrailleUniversalOptions
} from "./BrailleCart";

export interface BrailleMenuContainerProps {
  itemsInCart: ItemCardModel[];
  associatedItemsInPrintCart?: ItemCardModel[];
  onUpdateUniversalSelectedBraille: (
    operation: string,
    selectedBraille: string
  ) => void;
  universalSelectedBraille: string[];
}

export interface BrailleMenuContainerState {
  isSelectedValueChanged: boolean;
  showAlertMsg: boolean;
}

export class BrailleMenuContainer extends React.Component<
  BrailleMenuContainerProps,
  BrailleMenuContainerState
> {
  constructor(props: BrailleMenuContainerProps) {
    super(props);
    this.state = {
      isSelectedValueChanged: false,
      showAlertMsg: false
    };
    this.handleApplyAll = this.handleApplyAll.bind(this);
  }

  // componentWillReceiveProps(nextProps: BrailleMenuContainerProps) {
  //   this.setState({selectedBrailleTypes: this.props.universalSelectedBraille});
  // }

  handleApplyAll = (v: MultiselectValue[]) => {
    //Check if option get selected
    if (v[0].selected && v[0].selected === true) {
      this.props.onUpdateUniversalSelectedBraille("ADD", v[0].value);
    } else {
      this.props.onUpdateUniversalSelectedBraille("REMOVE", v[0].value);
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
    let showAlertMsg = false;
    this.props.itemsInCart.forEach(item => {
      let applicableBraille: string[] = [];
      this.props.universalSelectedBraille.forEach(brailleToApply => {
        item.availableBrailleTypes.forEach(option => {
          if (
            option.selectionCode == brailleToApply &&
            option.disabled == false
          ) {
            applicableBraille.push(brailleToApply);
          } else {
            showAlertMsg = true;
          }
        });
      });
      if (item.selectedBrailleTypes === undefined)
        item.selectedBrailleTypes = [];
      item.selectedBrailleTypes = applicableBraille;
      console.log("checking*******", item);
    });
    this.setState({ isSelectedValueChanged: true, showAlertMsg: showAlertMsg });
  };

  render() {
    return (
      <div>
        <div className="brailleOptionContainer">
          <b>Braille Options : </b>
          <Multiselect
            multiple
            data={getBrailleUniversalOptions(
              this.props.itemsInCart,
              this.props.universalSelectedBraille
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

        <div
          className="alert alert-warning braille-alert-msg"
          hidden={this.state.showAlertMsg === true ? false : true}
        >
          <strong /> Some Braille from selected option is/are not applicable for
          some of the item.
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
