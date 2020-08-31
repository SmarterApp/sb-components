import * as React from "react";
import { ItemCardModel } from "@src/index";
import "bootstrap";
import "@src/Assets/Styles/braille-cart.less";
import { PrintAccessibilityModal } from "@src/Accessibility/PrintAccessibilityModal";
import {
  TestCodeToLabel,
  ItemIdToTestNameMap
} from "@src/ItemSearch/ItemSearchModels";
import { BrailleMenuContainer } from "./BrailleMenuContainer";
import { getBrailleLabelFromCode, getAssociatedItems } from "./BrailleCart";

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
              <td tabIndex={0}>{element.itemKey}</td>
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
          {getBrailleLabelFromCode(brailleType)}
        </span>
      ));
    }
    return selectedBrailleTag;
  };

  renderFinalBrailleSelection = () => {
    const itemsInCart = this.props.itemsInCart;
    const associatedItemsInCart = this.props.associatedItemsInPrintCart;
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
