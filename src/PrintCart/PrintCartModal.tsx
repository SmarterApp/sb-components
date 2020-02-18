import * as React from "react";
import * as ReactModal from "react-modal";
import { SelectOptionProps, Select } from "@src/index";
import { ItemCardModel,ItemTableContainer, ItemModel } from "@src/index";
import { PrintAccessibilityModal } from "@src/Accessibility/PrintAccessibilityModal";

export interface PrintCartProps {
  showModal: boolean;
  onChangeModelState: (modelShowState: boolean) => void;
//   onSubmitPrint?: (
//     langCode?: string,
//     GlossaryRequired?: string,
//     IllustrationRequired?: string
//   ) => void;
  itemsInCart: ItemCardModel[];
  StatusMessage?: string;
  onRowSelection: (item: ItemModel, reset: boolean) => void;
  onItemSelection: (item: ItemCardModel) => void;
  isLinkTable: boolean;
}
export interface PrintCartState {
  isChanged: boolean;
}

export class PrintCartModal extends React.Component<
    PrintCartProps,
    PrintCartState
> {
  constructor(props: PrintCartProps) {
    super(props);
    this.state = {
     isChanged: false
    };
  }

  renderBody(): JSX.Element {
    if (this.props.itemsInCart && this.props.itemsInCart.length > 0) {
        return (
            <ItemTableContainer
                onRowSelection={this.props.onRowSelection}
                onItemSelection={this.props.onItemSelection}
                itemCards={this.props.itemsInCart}
                //item={this.props.item}
                isLinkTable={false}
               
            />
        );
    }
    else {
        return (
        <div>{"There is no item in cart. Please select any item to continue"}</div>
        );
    }
    
  }

  handleHideModal = () => {
    this.props.onChangeModelState(false);
  };
  activeOrDisabled = () => {
    if (this.props.itemsInCart && this.props.itemsInCart.length > 0) {
      return "active";
    }
    else
      return "disabled";
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
          className="react-modal-content about-item-modal"
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
            <div className="modal-body">
              <div className="status-message-print">
                <strong>
                  {" "}
                  Total item(s) selected : {this.props.itemsInCart.length}
                </strong>{" "}
                <br />
              </div>
              <form id="accessibility-form">
                <div className="accessibility-groups">
                    {this.renderBody()}
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
                className={"btn btn-primary " + this.activeOrDisabled()}
                aria-label="Continue modal"
                //onClick={this.renderPrintAccessibility()}
              >
                Continue
              </button>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}
