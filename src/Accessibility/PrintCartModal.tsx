import * as React from "react";
import * as ReactModal from "react-modal";
import { SelectOptionProps, Select } from "@src/index";
import { ItemCardModel,ItemTableContainer, ItemModel } from "@src/index";

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
        <div>{"There is no item in cart"}</div>
        );
    }
    
  }

  handleHideModal = () => {
    this.props.onChangeModelState(false);
  };

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
                className="btn btn-primary"
                aria-label="Continue modal"
                // onClick={this.handlePrintItems}
              >
                Submit
              </button>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}




// before return
//   handlePrintItems = () => {
//     this.props.onSubmitPrint(
//       this.state.selectedLangCode,
//       this.state.selectedGlossary,
//       this.state.selectedIllustration
//     );
//   };

//   handleLanguageChange = (newLangCode: string) => {
//     if (newLangCode !== this.state.selectedLangCode) {
//       this.setState({
//         selectedLangCode: newLangCode
//       });
//     }
//   };

//   handleIllustrationChange = (newIllustration: string) => {
//     if (newIllustration !== this.state.selectedIllustration) {
//       this.setState({
//         selectedIllustration: newIllustration
//       });
//     }
//   };

//   handleGlossaryOptionChange = (newGlossaryOption: string) => {
//     if (newGlossaryOption !== this.state.selectedGlossary) {
//       this.setState({
//         selectedGlossary: newGlossaryOption
//       });
//     }
//   };

//   renderTranslationLanguages(): JSX.Element {
//     const selectedLanguageCode = this.state.selectedLangCode;

//     const selectOptions: SelectOptionProps[] = [];

//     selectOptions.push({
//       label: "English",
//       value: "ENU",
//       disabled: false,
//       selected: selectedLanguageCode === "ENU"
//     });

//     selectOptions.push({
//       label: "Spanish & English",
//       value: "ESN",
//       disabled: false,
//       selected: selectedLanguageCode === "ESN"
//     });

//     return (
//       <>
//         <Select
//           className="select-print-accessibility"
//           label="Language"
//           // labelClass="hidden"
//           selected={selectedLanguageCode || ""}
//           options={selectOptions}
//           onChange={this.handleLanguageChange}
//         />
//       </>
//     );
//   }

//   renderIllustrationOptions(): JSX.Element {
//     const selectedIllustration = this.state.selectedIllustration;
//     const selectOptions: SelectOptionProps[] = [];
//     selectOptions.push({
//       label: "Illustration Glossary Off",
//       value: "false",
//       disabled: false,
//       selected: selectedIllustration === "false"
//     });

//     selectOptions.push({
//       label: "Illustration Glossary On",
//       value: "True",
//       disabled: false,
//       selected: selectedIllustration === "true"
//     });

//     return (
//       <Select
//         className="select-print-accessibility"
//         label="Illustration Glossary"
//         //labelClass="hidden"
//         selected={selectedIllustration || ""}
//         options={selectOptions}
//         onChange={this.handleIllustrationChange}
//       />
//     );
//   }

//   renderGlossaryOptions(): JSX.Element {
//     const selectedGlossary = this.state.selectedGlossary;
//     const selectOptions: SelectOptionProps[] = [];
//     selectOptions.push({
//       label: "Glossary Off",
//       value: "false",
//       disabled: false,
//       selected: selectedGlossary === "false"
//     });

//     selectOptions.push({
//       label: "Glossary On",
//       value: "True",
//       disabled: false,
//       selected: selectedGlossary === "True"
//     });

//     return (
//       <>
//         <Select
//           className="select-print-accessibility"
//           label="Glossary"
//           //labelClass="hidden"
//           selected={selectedGlossary || ""}
//           options={selectOptions}
//           onChange={this.handleGlossaryOptionChange}
//         />
//       </>
//     );
//   }