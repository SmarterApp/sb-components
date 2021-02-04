import * as React from "react";
import * as ReactModal from "react-modal";
import { PrintWizardSteps1, PrintWizardSteps2 } from "./PrintWizardSteps";
import {
  TestCodeToLabel,
  ItemIdToTestNameMap
} from "@src/ItemSearch/ItemSearchModels";
import { SelectOptionProps, Select, AccResourceGroupModel } from "@src/index";
import { ItemCardModel, ItemTableContainer, ItemModel } from "@src/index";
import { PrintAccessibilityModal } from "@src/Accessibility/PrintAccessibilityModal";
import { getUpdatedSelectedItems } from "@src/SearchResultContainer/SearchResultContainerHelper";
import { DropDownSelectionModel } from "@src/DropDown/DropDownModels";
import { ItemColumnHeadersConfig } from "@src/SearchResultContainer/SearchResultModels";

export interface PrintCartModalProps {
  showModal: boolean;
  onChangeModelState: (modelShowState: boolean) => void;
  onItemsReorder: (i: number, j: number) => void;
  onSubmitPrint: (
    langCode?: string,
    GlossaryRequired?: string,
    IllustrationRequired?: string,
    pdfContentType?: string,
    TranslationGlossary?: string
  ) => void;
  itemsInCart: ItemCardModel[];
  StatusMessage?: string;
  handleUpdateItemsinPrintCart: (itemsInPrintCart: ItemCardModel[]) => void;
  onAddOrRemoveSelectedItems: (item: ItemCardModel) => void;
  isSelectedItemsHaveMathItem: boolean;
  associatedItemsInPrintCart?: ItemCardModel[];
  totalSelectedItemsCount: number;
  isInterimSite: boolean;
  testCodeToLabelMap: TestCodeToLabel;
  itemIdToTestNameMap: ItemIdToTestNameMap;
  translationAccessibility?: DropDownSelectionModel[];
  itemTableConfig: ItemColumnHeadersConfig[];
}
export interface PrintCartModalState {
  isChanged: boolean;
  currentStep: number;
  itemsInPrintCart: ItemCardModel[];
  isSelectedItemsHaveMathItem: boolean;
  selectedLangCode: string;
  selectedIllustration: string;
  selectedGlossary: string;
  selectedPrintOption: string;
  selectedTranslationGlossary: string;
}

export class PrintCartModal extends React.Component<
  PrintCartModalProps,
  PrintCartModalState
> {
  constructor(props: PrintCartModalProps) {
    super(props);
    this.state = {
      isChanged: false,
      currentStep: 1,
      itemsInPrintCart: [],
      isSelectedItemsHaveMathItem: false,
      selectedLangCode: "ENU",
      selectedIllustration: "false",
      selectedGlossary: "true",
      selectedPrintOption: "ITEMS-ONLY",
      selectedTranslationGlossary: "None"
    };
  }

  componentWillReceiveProps(nextProps: PrintCartModalProps) {
    if (
      nextProps.isSelectedItemsHaveMathItem !==
      this.props.isSelectedItemsHaveMathItem
    )
      this.setState({
        itemsInPrintCart: nextProps.itemsInCart
      });
    else this.setState({ itemsInPrintCart: nextProps.itemsInCart });
  }

  // After printing, reset accessibility options
  handlePrintItems = () => {
    this.props.onSubmitPrint(
      this.state.selectedLangCode,
      this.state.selectedGlossary,
      this.state.selectedIllustration,
      this.state.selectedPrintOption,
      this.state.selectedTranslationGlossary
    );
    this.setState({
      selectedLangCode: "ENU",
      selectedIllustration: "false",
      selectedGlossary: "true",
      selectedPrintOption: "ITEMS-ONLY",
      selectedTranslationGlossary: "None"
    });
  };

  handleLanguageChange = (newLangCode: string) => {
    if (newLangCode !== this.state.selectedLangCode) {
      this.setState({
        selectedLangCode: newLangCode
      });
    }
  };

  handleIllustrationChange = (newIllustration: string) => {
    if (newIllustration !== this.state.selectedIllustration) {
      this.setState({
        selectedIllustration: newIllustration
      });
    }
  };

  handleGlossaryOptionChange = (newGlossaryOption: string) => {
    if (newGlossaryOption !== this.state.selectedGlossary) {
      console.log(newGlossaryOption);
      this.setState({
        selectedGlossary: newGlossaryOption
      });
    }
  };

  handlePrintOptionChange = (newPrintOptionCode: string) => {
    if (newPrintOptionCode !== this.state.selectedPrintOption) {
      this.setState({
        selectedPrintOption: newPrintOptionCode
      });
    }
  };
  //on transaltion glossary change
  handleTranslationGlossaryChange = (newTranslationGlossary: string) => {
    if (newTranslationGlossary !== this.state.selectedTranslationGlossary) {
      this.setState({
        selectedTranslationGlossary: newTranslationGlossary
      });
    }
  };

  handleHideModal = () => {
    this.setState({
      selectedLangCode: "ENU",
      selectedIllustration: "false",
      selectedGlossary: "true",
      selectedPrintOption: "ITEMS-ONLY",
      selectedTranslationGlossary: "None"
    });
    this.props.onChangeModelState(false);
    this.setState({ currentStep: 1 });
    this.props.handleUpdateItemsinPrintCart(this.state.itemsInPrintCart);
    // ********set seleteditems state to new one**************************************
  };

  activeOrDisabled = () => {
    if (this.props.itemsInCart && this.props.itemsInCart.length > 0) {
      return "active";
    } else return "disabled";
  };
  previousButtonClassName = () => {
    if (this.state.currentStep === 1) return "disabled";
    else return "active";
  };

  _previous = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep === 2 ? 1 : 1;
    this.setState({
      currentStep: currentStep
    });
  };
  _next = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep === 1 ? 2 : 0;
    this.setState({
      currentStep: currentStep
    });
  };

  nextOrPrintButtonText = () => {
    if (this.state.currentStep === 1) return "Next";
    else return "Print To PDF";
  };

  nextButtonClassName = () => {
    if (this.state.currentStep === 1 && this.props.itemsInCart.length <= 0)
      return "disabled";
    else return "active";
  };

  nextOrPrintBtnFunctin = () => {
    if (this.state.currentStep === 1) this._next();
    else {
      this.handlePrintItems();
      this.setState({ currentStep: 1 });
    }
  };

  nextOrPrintBtnAriaLabel = () => {
    if (this.state.currentStep === 1) return "Go to next";
    else {
      return "Print items in cart to pdf";
    }
  };

  renderBody(): JSX.Element {
    return (
      <>
        <PrintWizardSteps1
          itemsInCart={this.props.itemsInCart}
          associatedItemsInPrintCart={this.props.associatedItemsInPrintCart}
          currentStep={this.state.currentStep}
          onAddOrRemoveSelectedItems={this.props.onAddOrRemoveSelectedItems}
          onItemsReorder={this.props.onItemsReorder}
          handleUpdateItemsinPrintCart={this.props.handleUpdateItemsinPrintCart}
          isInterimSite={this.props.isInterimSite}
          testCodeToLabelMap={this.props.testCodeToLabelMap}
          itemIdToTestNameMap={this.props.itemIdToTestNameMap}
          itemTableConfig={this.props.itemTableConfig}
        />

        <PrintWizardSteps2
          itemsInCart={this.props.itemsInCart}
          // onSubmitPrint={this.handlePrintItems}
          handleLanguageChange={this.handleLanguageChange}
          handleIllustrationChange={this.handleIllustrationChange}
          handleGlossaryOptionChange={this.handleGlossaryOptionChange}
          handlePrintOptionChange={this.handlePrintOptionChange}
          selectedLangCode={this.state.selectedLangCode}
          selectedIllustration={this.state.selectedIllustration}
          selectedGlossary={this.state.selectedGlossary}
          selectedPrintOption={this.state.selectedPrintOption}
          handleTranslationGlossaryChange={this.handleTranslationGlossaryChange}
          selectedTranslationGlossary={this.state.selectedTranslationGlossary}
          currentStep={this.state.currentStep}
          onChangeModelState={this.props.onChangeModelState}
          showModal={this.props.showModal}
          //StatusMessage={statusMessage}
          isSelectedItemsHaveMathItem={this.props.isSelectedItemsHaveMathItem}
          onItemsReorder={this.props.onItemsReorder}
          isInterimSite={this.props.isInterimSite}
          translationAccessibility={this.props.translationAccessibility}
        />
      </>
    );
  }

  render() {
    const modelState = this.props.showModal;
    return (
      <div className="search-result-container">
        <ReactModal
          isOpen={modelState}
          contentLabel="Print cart modal opened"
          onRequestClose={this.handleHideModal}
          overlayClassName="react-modal-overlay react-modal-overlay-printcart"
          className="react-modal-content-printcart"
          shouldCloseOnEsc={false}
          shouldCloseOnOverlayClick={false}
        >
          <div
            className="modal-wrapper"
            aria-labelledby="Print Cart"
            // aria-hidden="true"
          >
            <div className="modal-header">
              <h4 className="modal-title">Print Cart</h4>
              <button
                className="close"
                onClick={this.handleHideModal}
                aria-label="Close print cart modal"
              >
                <span className="fa fa-times" />
              </button>
            </div>
            <div className="modal-body print-cart-modal-body">
              <div
                className="status-message-print"
                role="dialog"
                aria-labelledby="printCartItemsCount"
                aria-describedby="printCartItemsCount"
                tabIndex={0}
              >
                <strong id="">
                  {" "}
                  Total item(s) selected : {this.props.totalSelectedItemsCount}
                </strong>{" "}
                <h5 hidden id="printCartItemsCount">
                  Total items selected : {this.props.totalSelectedItemsCount}
                </h5>
                <br />
              </div>
              <form id="accessibility-form">
                <div className="accessibility-groups">{this.renderBody()}</div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary btn-sm "
                aria-label="Close print cart modal"
                onClick={this.handleHideModal}
              >
                Close
              </button>

              <button
                className={
                  "btn btn-primary btn-wizard btn-sm " +
                  this.previousButtonClassName()
                }
                aria-label="Go to previous"
                aria-disabled={
                  this.previousButtonClassName() === "disabled" ? true : false
                }
                onClick={this._previous}
                id={
                  this.previousButtonClassName() === "disabled"
                    ? "disabled-wizard-btn"
                    : "active-wizard-btn"
                }
              >
                Previous
              </button>

              <button
                className={
                  "btn btn-primary btn-sm " + this.nextButtonClassName()
                }
                aria-label={this.nextOrPrintBtnAriaLabel()}
                onClick={this.nextOrPrintBtnFunctin}
              >
                {this.nextOrPrintButtonText()}
              </button>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}
