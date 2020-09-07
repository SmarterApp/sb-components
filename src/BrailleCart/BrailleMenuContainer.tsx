import * as React from "react";
import { ItemCardModel } from "@src/index";
import "@src/Assets/Styles/braille-cart.less";
import { BrailleCartMenu } from "./BrailleCartMenu";
import { Multiselect, MultiselectValue } from "react-bootstrap-multiselect-ts";
import { getBrailleUniversalOptions } from "./BrailleCart";
import { MultiSelect } from "@src/Select/MultiSelect";
import { multiSelectOptions } from "@src/Select/SelectModel";

export interface BrailleMenuContainerProps {
  itemsInCart: ItemCardModel[];
  associatedItemsInPrintCart?: ItemCardModel[];
}

export interface BrailleMenuContainerState {
  isSelectedValueChanged: boolean;
  showAlertMsg: boolean;
  universalSelectedBraille: string[];
}

export class BrailleMenuContainer extends React.Component<
  BrailleMenuContainerProps,
  BrailleMenuContainerState
> {
  constructor(props: BrailleMenuContainerProps) {
    super(props);
    this.state = {
      isSelectedValueChanged: false,
      showAlertMsg: false,
      universalSelectedBraille: []
    };
    this.handleApplyAll = this.handleApplyAll.bind(this);
  }

  handleUpdateUniversalSelectedBraille = (
    operation: string,
    selectedBraille: string,
    selectedHtmlDom?: HTMLElement
  ) => {
    let univeralSelectedBraille = this.state.universalSelectedBraille.slice();

    if (operation === "ADD") {
      if (univeralSelectedBraille.indexOf(selectedBraille) === -1) {
        univeralSelectedBraille.push(selectedBraille);
      }
    }

    if (operation === "REMOVE") {
      if (univeralSelectedBraille.indexOf(selectedBraille) !== -1) {
        univeralSelectedBraille = univeralSelectedBraille.filter(
          x => x !== selectedBraille
        );
      }
    }

    this.setState({ universalSelectedBraille: univeralSelectedBraille });
  };

  handleApplyAll = (v: MultiselectValue[]) => {
    //Check if option get selected
    if (v[0].selected && v[0].selected === true) {
      this.handleUpdateUniversalSelectedBraille("ADD", v[0].value);
    } else {
      this.handleUpdateUniversalSelectedBraille("REMOVE", v[0].value);
    }

    //Bring the focus back to the current selected/unselected dropdown option
    const inputTagElement = document.getElementsByTagName("input");

    for (let i = 0; i < inputTagElement.length; i++) {
      if (
        inputTagElement[i].type === "checkbox" &&
        inputTagElement[i].value == v[0].value
      ) {
        inputTagElement[i].parentElement!.parentElement!.focus();
        break;
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
    let showAlertMsg = false;
    this.props.itemsInCart.forEach(item => {
      let applicableBraille: string[] = [];

      this.state.universalSelectedBraille.forEach(brailleToApply => {
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
    });
    this.setState({ isSelectedValueChanged: true, showAlertMsg: showAlertMsg });
  };

  render() {
    return (
      <div>
        <div className="brailleOptionContainer">
          <label htmlFor="">
            <b>Braille Options : </b>
          </label>
          <Multiselect
            multiple
            data={getBrailleUniversalOptions(
              this.props.itemsInCart,
              this.state.universalSelectedBraille
            )}
            numberDisplayed={1}
            onChange={this.handleApplyAll}
            buttonWidth="150px"
            tabIndex={0}
            className="apply-all-multiselect"
          />{" "}
          {/* <MultiSelect
            options={getBrailleUniversalOptions(
              this.props.itemsInCart,
              this.state.universalSelectedBraille
            )}
            onChange={this.handleApplyAll}
          /> */}
          &nbsp;
          <button
            onClick={this.applyBrailleTypeToAll}
            tabIndex={0}
            aria-label="Apply to all"
            type="button"
            className="btn btn-link"
            id="apply_all"
          >
            Apply to all
          </button>
        </div>

        <div
          className="alert alert-warning braille-alert-msg"
          hidden={this.state.showAlertMsg === true ? false : true}
        >
          <strong /> Some of the items in the cart does not have the selected
          Braille options.
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
