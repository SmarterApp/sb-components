import * as React from "react";
import * as ReactModal from "react-modal";
import { SelectOptionProps, Select, AccResourceGroupModel } from "@src/index";
import { ItemCardModel, ItemTableContainer, ItemModel } from "@src/index";
import { PrintAccessibilityModal } from "@src/Accessibility/PrintAccessibilityModal";
import { PrintCartTableContainer } from "./PrintCartItemTableContainer";
import { DropDownSelectionModel } from "lib/src";

export interface PrintWizardSteps1_Props {
  itemsInCart: ItemCardModel[];
  StatusMessage?: string;
  currentStep: number;
  onAddOrRemoveSelectedItems: (item: ItemCardModel) => void;
  associatedItemsInPrintCart?: ItemCardModel[];
  onItemsReorder: (i: number, j: number) => void;
  handleUpdateItemsinPrintCart: (itemsInPrintCart: ItemCardModel[]) => void;
  isInterimSite: boolean;
}

export interface PrintWizardSteps2_Props {
  handleLanguageChange: (newLangCode: string) => void;
  handleIllustrationChange: (newIllustration: string) => void;
  handleGlossaryOptionChange: (newGlossaryOption: string) => void;
  handleTranslationGlossaryChange: (newTranslationGlossary: string) => void;
  selectedLangCode: string;
  selectedIllustration: string;
  selectedGlossary: string;
  selectedTranslationGlossary: string;
  itemsInCart: ItemCardModel[];
  currentStep: number;
  onChangeModelState: (modelShowState: boolean) => void;
  onItemsReorder: (i: number, j: number) => void;
  showModal: boolean;
  //StatusMessage: string
  isSelectedItemsHaveMathItem: boolean;
  translationAccessibility?: DropDownSelectionModel[];
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
              isInterimSite={this.props.isInterimSite}
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
            // onSubmitPrint={this.props.onSubmitPrint}
            handleLanguageChange={this.props.handleLanguageChange}
            handleIllustrationChange={this.props.handleIllustrationChange}
            handleGlossaryOptionChange={this.props.handleGlossaryOptionChange}
            handleTranslationGlossaryChange={
              this.props.handleTranslationGlossaryChange
            }
            selectedLangCode={this.props.selectedLangCode}
            selectedIllustration={this.props.selectedIllustration}
            selectedGlossary={this.props.selectedGlossary}
            selectedTranslationGlossary={this.props.selectedTranslationGlossary}
            onChangeModelState={this.props.onChangeModelState}
            showModal={this.props.showModal}
            itemsInCartCount={this.props.itemsInCart.length.toString()}
            areSelectedItemsHaveMath={this.props.isSelectedItemsHaveMathItem}
            StatusMessage={""}
            translationAccessibility={this.props.translationAccessibility}
          />
        </>
      );
    }
  }
}
