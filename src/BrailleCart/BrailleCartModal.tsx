import * as React from "react";
import * as ReactModal from "react-modal";
import { ItemCardModel } from "@src/index";
import { PrintWizardSteps1 } from "@src/PrintCart/PrintWizardSteps";
import {
  TestCodeToLabel,
  ItemIdToTestNameMap
} from "@src/ItemSearch/ItemSearchModels";
import { BrailleOptionsWizard } from "./BrailleOptionsWizard";
import {
  getItemsWithSelectedBraille,
  isAnyBrailleOptionSelected
} from "./BrailleCart";
import { BrailleCartWizardFinal } from "./BrailleCartWizardFinal";

export interface BrailleCartModalProps {
  showModal: boolean;
  onChangeModelState: (modelShowState: boolean) => void;
  onItemsReorder: (i: number, j: number) => void;
  onDownloadBraille: (selectedBrailleType: { [key: number]: string[] }) => void;
  itemsInCart: ItemCardModel[];
  StatusMessage?: string;
  handleUpdateItemsinPrintCart: (itemsInPrintCart: ItemCardModel[]) => void;
  onAddOrRemoveSelectedItems: (item: ItemCardModel) => void;
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
  universalSelectedBraille: string[];
}

export class BrailleCartModal extends React.Component<
  BrailleCartModalProps,
  BrailleCartModalState
> {
  constructor(props: BrailleCartModalProps) {
    super(props);
    this.state = {
      isChanged: false,
      currentStep: 1,
      itemsInPrintCart: [],
      universalSelectedBraille: []
    };
  }

  componentWillReceiveProps(nextProps: BrailleCartModalProps) {
    this.setState({ itemsInPrintCart: nextProps.itemsInCart });
  }

  // componentDidMount() {
  //   if(this.props.showModal){
  //     document.body.style.overflow = 'hidden';
  //   }
  // }

  // componentWillUnmount() {
  //     document.body.style.overflow = 'unset';
  // }

  handleDownloadBraille = () => {
    const itemsBrailleToDownload = getItemsWithSelectedBraille(
      this.props.itemsInCart,
      this.props.associatedItemsInPrintCart
    );
    this.props.onDownloadBraille(itemsBrailleToDownload);
  };

  handleHideModal = () => {
    this.props.onChangeModelState(false);
    this.setState({ currentStep: 1 });
    // this.props.handleUpdateItemsinPrintCart(this.state.itemsInPrintCart);
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
    if (currentStep === 3) currentStep = 2;
    else if (currentStep === 2) currentStep = 1;
    else currentStep = 1;
    this.setState({
      currentStep: currentStep
    });
  };
  _next_selectBraille = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep === 1 ? 2 : 0;
    this.setState({
      currentStep: currentStep
    });
  };
  _next_displayFinalSelection = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep === 2 ? 3 : 0;
    this.setState({
      currentStep: currentStep
    });
  };

  nextOrDownloadButtonText = () => {
    if (this.state.currentStep === 1 || this.state.currentStep === 2)
      return "Next";
    else return "Download Braille";
  };

  nextButtonClassName = () => {
    if (this.props.itemsInCart.length <= 0) {
      return "disabled";
    } else if (
      this.state.currentStep === 3 &&
      isAnyBrailleOptionSelected(this.props.itemsInCart) === false
    )
      return "disabled";
    else {
      return "active";
    }
    // if (this.state.currentStep === 3 && this.props.itemsInCart.length <= 0)
    //   return "disabled";
    // else return "active";
  };

  nextOrDownloadBtnFunctin = () => {
    if (this.state.currentStep === 1) this._next_selectBraille();
    else if (this.state.currentStep === 2) this._next_displayFinalSelection();
    else {
      this.handleDownloadBraille();
      this.setState({ currentStep: 1 });
    }
  };

  nextOrDownloadBtnAriaLabel = () => {
    if (this.state.currentStep === 1 || this.state.currentStep === 2)
      return "Go to next";
    else {
      return "Download Braille";
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

        <BrailleCartWizardFinal
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
              {/* <form id="accessibility-form"> */}
              <div className="accessibility-groups">
                <div className="accessibility-resource-type section section-light">
                  {this.renderBody()}
                </div>
              </div>
              {/* </form> */}
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary btn-sm "
                aria-label="Close braille Cart modal"
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
                  "btn btn-primary btn-wizard-next-download btn-sm " +
                  this.nextButtonClassName()
                }
                id={
                  this.nextButtonClassName() === "disabled"
                    ? "disabled-wizard-btn"
                    : "active-wizard-btn"
                }
                aria-label={this.nextOrDownloadBtnAriaLabel()}
                onClick={this.nextOrDownloadBtnFunctin}
              >
                {this.nextOrDownloadButtonText()}
              </button>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}
