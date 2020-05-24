import * as React from "react";
import * as ReactModal from "react-modal";
import { SelectOptionProps, Select } from "@src/index";
import { ItemCardModel, ItemTableContainer, ItemModel } from "@src/index";
import { PrintAccessibilityModal } from "@src/Accessibility/PrintAccessibilityModal";
import { PrintCartTableContainer } from "./PrintCartItemTableContainer";

export interface PrintWizardSteps1_Props {
  itemsInCart: ItemCardModel[];
  StatusMessage?: string;
  currentStep: number;
  onAddOrRemoveSelectedItems: (item: ItemCardModel) => void;
  associatedItemsInPrintCart?: ItemCardModel[];
  onItemsReorder: (i: number, j: number) => void;
  handleUpdateItemsinPrintCart: (
    itemsInPrintCart: ItemCardModel[],
    isItemsInCartChanged: boolean
  ) => void;
}

export interface PrintWizardSteps2_Props {
  onSubmitPrint: (
    langCode?: string,
    GlossaryRequired?: string,
    IllustrationRequired?: string
  ) => void;
  itemsInCart: ItemCardModel[];
  currentStep: number;
  onChangeModelState: (modelShowState: boolean) => void;
  onItemsReorder: (i: number, j: number) => void;
  showModal: boolean;
  //StatusMessage: string
  isSelectedItemsHaveMathItem: boolean;
}

export class PrintWizardSteps1 extends React.Component<
  PrintWizardSteps1_Props
> {
  constructor(props: PrintWizardSteps1_Props) {
    super(props);
  }

  render() {
    if (this.props.currentStep !== 1) return null;
    else {
      if (this.props.itemsInCart && this.props.itemsInCart.length > 0) {
        return (
          <div className="accessibility-resource-type section section-light">
            <PrintCartTableContainer
              onItemsReorder={this.props.onItemsReorder}
              ItemsInPrintCart={this.props.itemsInCart}
              associatedItemsInPrintCart={this.props.associatedItemsInPrintCart}
              onAddOrRemoveSelectedItems={this.props.onAddOrRemoveSelectedItems}
              handleUpdateItemsinPrintCart={
                this.props.handleUpdateItemsinPrintCart
              }
            />
          </div>
        );
      } else {
        return (
          <div>
            {"There is no item in cart. Please select any item to continue"}
          </div>
        );
      }
    }
  }
}

export class PrintWizardSteps2 extends React.Component<
  PrintWizardSteps2_Props
> {
  constructor(props: PrintWizardSteps2_Props) {
    super(props);
  }

  render() {
    if (this.props.currentStep !== 2) return null;
    else {
      return (
        <>
          <PrintAccessibilityModal
            onSubmitPrint={this.props.onSubmitPrint}
            onChangeModelState={this.props.onChangeModelState}
            showModal={this.props.showModal}
            itemsInCartCount={this.props.itemsInCart.length.toString()}
            areSelectedItemsHaveMath={this.props.isSelectedItemsHaveMathItem}
            StatusMessage={"Check it........"}
          />
        </>
      );
    }
  }
}
