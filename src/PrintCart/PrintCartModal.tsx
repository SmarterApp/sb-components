import * as React from "react";
import * as ReactModal from "react-modal";
import { SelectOptionProps, Select } from "@src/index";
import { ItemCardModel, ItemTableContainer, ItemModel } from "@src/index";
import { PrintAccessibilityModal } from "@src/Accessibility/PrintAccessibilityModal";
import { PrintWizardSteps1, PrintWizardSteps2 } from "./PrintWizardSteps";
import { getUpdatedSelectedItems } from "@src/SearchResultContainer/SearchResultContainerHelper";

export interface PrintCartProps {
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
  syncSelectedItemsAndItemsinCart: (
    itemsInPrintCart: ItemCardModel[],
    isItemsInCartChanged: boolean
  ) => void;
  onUpdateItemsInPrintCart: (item: ItemCardModel) => void;
  isSelectedItemsHaveMathItem: boolean;
  associatedItemsInPrintCart?: ItemCardModel[];
  totalSelectedItemsCount: number;
}
export interface PrintCartState {
  isChanged: boolean;
  currentStep: number;
  itemsInPrintCart: ItemCardModel[];
  // isSelectedItemsHaveMathItem: boolean;
}

export class PrintCartModal extends React.Component<
  PrintCartProps,
  PrintCartState
> {
  constructor(props: PrintCartProps) {
    super(props);
    //this.onAddOrRemoveSelectedItems = this.onAddOrRemoveSelectedItems.bind(this);
    this.state = {
      isChanged: false,
      currentStep: 1,
      itemsInPrintCart: []
      //isSelectedItemsHaveMathItem: false
    };
  }

  componentWillReceiveProps(nextProps: PrintCartProps) {
    if (
      nextProps.isSelectedItemsHaveMathItem !==
      this.props.isSelectedItemsHaveMathItem
    )
      this.setState({
        // isSelectedItemsHaveMathItem: nextProps.isSelectedItemsHaveMathItem,
        itemsInPrintCart: nextProps.itemsInCart
      });
    else this.setState({ itemsInPrintCart: nextProps.itemsInCart });
  }

  // onAddOrRemoveSelectedItems = (item: ItemCardModel) => {
  //   const UpdatedItemsInCart:ItemCardModel[] = getUpdatedSelectedItems(item, this.state.itemsInPrintCart);
  //   //this.setState({itemsInPrintCart : UpdatedItemsInCart});
  // }

  handleHideModal = () => {
    this.props.onChangeModelState(false);
    this.setState({ currentStep: 1 });
    this.props.syncSelectedItemsAndItemsinCart(
      this.state.itemsInPrintCart,
      true
    );
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
      this.props.onSubmitPrint();
      this.setState({ currentStep: 1 });
    }
  };

  renderBody(): JSX.Element {
    return (
      <>
        <PrintWizardSteps1
          itemsInCart={this.props.itemsInCart}
          associatedItemsInPrintCart={this.props.associatedItemsInPrintCart}
          currentStep={this.state.currentStep}
          onAddOrRemoveSelectedItems={this.props.onUpdateItemsInPrintCart}
          onItemsReorder={this.props.onItemsReorder}
        />

        <PrintWizardSteps2
          itemsInCart={this.props.itemsInCart}
          onSubmitPrint={this.props.onSubmitPrint}
          currentStep={this.state.currentStep}
          onChangeModelState={this.props.onChangeModelState}
          showModal={this.props.showModal}
          //StatusMessage={statusMessage}
          isSelectedItemsHaveMathItem={this.props.isSelectedItemsHaveMathItem}
          onItemsReorder={this.props.onItemsReorder}
        />
      </>
    );
  }

  render() {
    const modelState = this.props.showModal;
    return (
      <div className="search-result-container">
        <ReactModal
          // isOpen={this.state.showModal}
          isOpen={modelState}
          contentLabel="About This Item Modal"
          onRequestClose={this.handleHideModal}
          overlayClassName="react-modal-overlay"
          className="react-modal-content about-item-modal print-cart-modal"
          ariaHideApp={false}
        >
          <div
            className="modal-wrapper"
            aria-labelledby="About Item Modal"
            aria-hidden="true"
          >
            <div className="modal-header">
              <h4 className="modal-title">Print Cart</h4>
              <button
                className="close"
                onClick={this.handleHideModal}
                aria-label="Close modal"
              >
                <span className="fa fa-times" aria-hidden="true" />
              </button>
            </div>
            <div className="modal-body print-cart-modal-body">
              <div className="status-message-print">
                <strong>
                  {" "}
                  Total item(s) selected : {this.props.totalSelectedItemsCount}
                </strong>{" "}
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
                aria-label="Close modal"
                onClick={this.handleHideModal}
              >
                Close
              </button>

              <button
                className={"btn btn-primary " + this.previousButtonClassName()}
                aria-label="Previous Btn Modal"
                onClick={this._previous}
              >
                Previous
              </button>

              <button
                className={"btn btn-primary " + this.nextButtonClassName()}
                aria-label="Continue modal"
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

//Modal for print - old**
// handleShowModal = (modelState: boolean): void => {
//   let visibleItems = this.props.itemCards;
//   let selectedItemCount = 0;
//   if (visibleItems !== undefined) {
//     for (let i = 0; i < visibleItems.length; i++) {
//       if (visibleItems[i].selected === true) {
//         selectedItemCount = selectedItemCount + 1;
//       }
//     }
//   }
//   if (selectedItemCount == 0 || selectedItemCount < 0) {
//     this.setState({
//       showErrorModal: modelState,
//       statusMessage: "Please select at least one item to print"
//     });
//   } else {
//     this.setState({
//       showModal: modelState,
//       statusMessage: selectedItemCount.toString()
//     });
//   }
// };

// renderPrintAccessibility(): JSX.Element {
//   return(
//     <PrintAccessibilityModal
//       onChangeModelState={this.handleShowModal}
//       onSubmitPrint={this.handlePrintItemsClick}
//       showModal={showModal}
//       StatusMessage={statusMessage}
//     />
//   );
// }
