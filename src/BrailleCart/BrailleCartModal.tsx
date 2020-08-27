import * as React from "react";
import * as ReactModal from "react-modal";
import { SelectOptionProps, Select } from "@src/index";
import { ItemCardModel, ItemTableContainer, ItemModel } from "@src/index";
import { PrintAccessibilityModal } from "@src/Accessibility/PrintAccessibilityModal";
import { PrintWizardSteps1 } from "@src/PrintCart/PrintWizardSteps";
import { getUpdatedSelectedItems } from "@src/SearchResultContainer/SearchResultContainerHelper";
import {
  TestCodeToLabel,
  ItemIdToTestNameMap
} from "@src/ItemSearch/ItemSearchModels";
import { BrailleOptionsWizard } from "./BrailleOptionsWizard";

export interface BrailleCartModalProps {
  showModal: boolean;
  onChangeModelState: (modelShowState: boolean) => void;
  onItemsReorder: (i: number, j: number) => void;
  onSubmitPrint: (
    langCode?: string,
    GlossaryRequired?: string,
    IllustrationRequired?: string
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
}
export interface BrailleCartModalState {
  isChanged: boolean;
  currentStep: number;
  itemsInPrintCart: ItemCardModel[];
  isSelectedItemsHaveMathItem: boolean;
  selectedLangCode: string;
  selectedIllustration: string;
  selectedGlossary: string;
}

export class BrailleCartModal extends React.Component<
  BrailleCartModalProps,
  BrailleCartModalState
> {
  constructor(props: BrailleCartModalProps) {
    super(props);
    //this.onAddOrRemoveSelectedItems = this.onAddOrRemoveSelectedItems.bind(this);
    this.state = {
      isChanged: false,
      currentStep: 1,
      itemsInPrintCart: [],
      isSelectedItemsHaveMathItem: false,
      selectedLangCode: "ENU",
      selectedIllustration: "false",
      selectedGlossary: "true"
      //isSelectedItemsHaveMathItem: false
    };
  }

  componentWillReceiveProps(nextProps: BrailleCartModalProps) {
    if (
      nextProps.isSelectedItemsHaveMathItem !==
      this.props.isSelectedItemsHaveMathItem
    )
      this.setState({
        itemsInPrintCart: nextProps.itemsInCart
      });
    else this.setState({ itemsInPrintCart: nextProps.itemsInCart });
  }

  handlePrintItems = () => {
    this.props.onSubmitPrint(
      this.state.selectedLangCode,
      this.state.selectedGlossary,
      this.state.selectedIllustration
    );
    this.setState({
      selectedLangCode: "ENU",
      selectedIllustration: "false",
      selectedGlossary: "true"
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
      this.setState({
        selectedGlossary: newGlossaryOption
      });
    }
  };

  handleHideModal = () => {
    this.setState({
      selectedLangCode: "ENU",
      selectedIllustration: "false",
      selectedGlossary: "true"
    });
    this.props.onChangeModelState(false);
    this.setState({ currentStep: 1 });
    this.props.handleUpdateItemsinPrintCart(this.state.itemsInPrintCart);
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
        />

        <BrailleOptionsWizard
          itemsInCart={this.props.itemsInCart}
          currentStep={this.state.currentStep}
          onChangeModelState={this.props.onChangeModelState}
          associatedItemsInPrintCart={this.props.associatedItemsInPrintCart}
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
          contentLabel="Braille cart modal opened"
          onRequestClose={this.handleHideModal}
          overlayClassName="react-modal-overlay react-modal-overlay-printcart"
          className="react-modal-content-printcart"
          shouldCloseOnEsc={false}
          shouldCloseOnOverlayClick={false}
        >
          <div
            className="modal-wrapper"
            aria-labelledby="Braille Cart"
            // aria-hidden="true"
          >
            <div className="modal-header">
              <h4 className="modal-title">Braille Cart</h4>
              <button
                className="close"
                onClick={this.handleHideModal}
                aria-label="Close praille Cart modal"
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
                <div className="accessibility-groups">
                  {/* <div className="accessibility-resource-type section section-light"> */}
                  {this.renderBody()}
                  {/* </div> */}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                aria-label="Close braille Cart modal"
                onClick={this.handleHideModal}
              >
                Close
              </button>

              <button
                className={
                  "btn btn-primary btn-wizard " + this.previousButtonClassName()
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
                className={"btn btn-primary " + this.nextButtonClassName()}
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
