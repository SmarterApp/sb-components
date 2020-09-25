import * as React from "react";
import { ItemCardModel, ToolTip } from "@src/index";
import "@src/Assets/Styles/braille-cart.less";
import {
  getAssociatedItems,
  ptItemsToolTipMessage,
  isAnyBrailleOptionSelected,
  getBrailleLabelFromCode
} from "./BrailleCart";

export interface BrailleOptionsWizardProps {
  itemsInCart: ItemCardModel[];
  onChangeModelState: (showBrailleModalState: boolean) => void;
  StatusMessage?: string;
  currentStep: number;
  associatedItemsInPrintCart?: ItemCardModel[];
}

export class BrailleCartWizardFinal extends React.Component<
  BrailleOptionsWizardProps
> {
  constructor(props: BrailleOptionsWizardProps) {
    super(props);
  }

  ptItemsToolTipMessage = () => {
    return <span>{ptItemsToolTipMessage}</span>;
  };

  renderSelectedBrailleForPtItems = (item: ItemCardModel) => {
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
                />
              </td>
              <td className="braille-td-value" tabIndex={0}>
                {this.renderSelectedBrailleInTag(item)}
              </td>
            </tr>
          </>
        ));
      }
    }
    return jsxForAssociatedItems;
  };

  renderSelectedBrailleInTag = (item: ItemCardModel) => {
    let selectedBrailleTag: any;
    if (
      item.selectedBrailleTypes !== undefined &&
      item.selectedBrailleTypes.length > 0
    ) {
      selectedBrailleTag = item.selectedBrailleTypes.map(brailleType => (
        <span className="label label-success selected-braille">
          {getBrailleLabelFromCode(item.availableBrailleTypes, brailleType)}
        </span>
      ));
    }
    return selectedBrailleTag;
  };

  renderFinalBrailleSelection = () => {
    const itemsInCart = this.props.itemsInCart;
    let selectedBrailleListTableValue: any;
    selectedBrailleListTableValue = itemsInCart.map(item => (
      <>
        <tr>
          <td tabIndex={0}>{item.itemKey}</td>
          <td className="braille-td-value" tabIndex={0}>
            {this.renderSelectedBrailleInTag(item)}
          </td>
        </tr>
        {this.renderSelectedBrailleForPtItems(item)}
      </>
    ));
    return selectedBrailleListTableValue;
  };

  render() {
    if (this.props.currentStep !== 3) return null;
    else {
      return (
        <>
          <div
            tabIndex={0}
            className="alert alert-danger braille-alert-msg"
            hidden={isAnyBrailleOptionSelected(this.props.itemsInCart)}
          >
            <strong /> Please select a braille option for at least one item. .
          </div>

          <div className="section item-table-container">
            <table className="braille-menu-table braille-selected-confirmation-table">
              <thead>
                <tr className="primary braille-cart-table-header">
                  <td className="braille-cart-td-itemid" colSpan={1}>
                    Item Id
                  </td>
                  <td className="braille-cart-td-selected" colSpan={1}>
                    Selected Braille Types
                  </td>
                </tr>
              </thead>
              <tbody>{this.renderFinalBrailleSelection()}</tbody>
            </table>
          </div>
        </>
      );
    }
  }
}
