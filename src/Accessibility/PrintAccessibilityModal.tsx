import * as React from "react";
import * as ReactModal from "react-modal";
import { SelectOptionProps, Select } from "@src/index";
//import { ItemCardModel } from "lib/src";

export interface PrintAccessibilityContainerProps {
  showModal: boolean;
  onChangeModelState: (modelShowState: boolean) => void;
  onSubmitPrint: (
    langCode?: string,
    GlossaryRequired?: string,
    IllustrationRequired?: string
  ) => void;
  StatusMessage: string;
  areSelectedItemsHaveMath: boolean;
}
export interface pageState {
  selectedLangCode?: string;
  selectedIllustration?: string;
  selectedGlossary?: string;
  areSelectedItemsHaveMath: boolean;
}

export class PrintAccessibilityModal extends React.Component<
  PrintAccessibilityContainerProps,
  pageState
> {
  constructor(props: PrintAccessibilityContainerProps) {
    super(props);
    this.state = {
      selectedLangCode: "ENU",
      selectedIllustration: "false",
      selectedGlossary: "true",
      areSelectedItemsHaveMath: props.areSelectedItemsHaveMath
    };
  }

  componentWillReceiveProps(nextProps: PrintAccessibilityContainerProps) {
    if(nextProps.areSelectedItemsHaveMath !== this.props.areSelectedItemsHaveMath) {
      this.setState({areSelectedItemsHaveMath: nextProps.areSelectedItemsHaveMath});
    }
  }

  handleHideModal = () => {
    this.setState({
      selectedLangCode: "ENU",
      selectedIllustration: "false",
      selectedGlossary: "true"
    });
    this.props.onChangeModelState(false);
  };

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

  renderTranslationLanguages(): JSX.Element {
    const selectedLanguageCode = this.state.selectedLangCode;

    const selectOptions: SelectOptionProps[] = [];

    selectOptions.push({
      label: "English",
      value: "ENU",
      disabled: false,
      selected: selectedLanguageCode === "ENU"
    });

    selectOptions.push({
      label: "Spanish & English",
      value: "ESN",
      disabled: false,
      selected: selectedLanguageCode === "ESN"
    });

    return (
      <>
        <Select
          className="select-print-accessibility"
          label="Language"
          // labelClass="hidden"
          selected={selectedLanguageCode || ""}
          options={selectOptions}
          onChange={this.handleLanguageChange}
        />
      </>
    );
  }

  renderIllustrationOptions(): JSX.Element {
    const selectedIllustration = this.state.selectedIllustration;
    const selectOptions: SelectOptionProps[] = [];
    selectOptions.push({
      label: "Illustration Glossary off",
      value: "false",
      disabled: false,
      selected: selectedIllustration === "false"
    });

    selectOptions.push({
      label: "Illustration Glossary on",
      value: "True",
      disabled: false,
      selected: selectedIllustration === "true"
    });

    return (
      <Select
        className="select-print-accessibility"
        label="Illustration Glossary"
        //labelClass="hidden"
        selected={selectedIllustration || ""}
        options={selectOptions}
        onChange={this.handleIllustrationChange}
      />
    );
  }

  renderGlossaryOptions(): JSX.Element {
    const selectedGlossary = this.state.selectedGlossary;
    const selectOptions: SelectOptionProps[] = [];

    selectOptions.push({
      label: "Glossary on",
      value: "True",
      disabled: false,
      selected: selectedGlossary === "True"
    });


    selectOptions.push({
      label: "Glossary off",
      value: "false",
      disabled: false,
      selected: selectedGlossary === "false"
    });
    return (
      <>
        <Select
          className="select-print-accessibility form-control"
          label="English Glossary"
          //labelClass="hidden"
          selected={selectedGlossary || ""}
          options={selectOptions}
          onChange={this.handleGlossaryOptionChange}
        />
      </>
    );
  }

  renderDesignatedSupport(): JSX.Element {
    if (!this.state.areSelectedItemsHaveMath) {
      return <></>;
      // Please wait while items is converting to pdf<ReactLoading type={"spokes"} color={"#000000"} height={'20%'} width={'20%'} />
    } else {
      return (
        <div className="accessibility-groups">
          <div className="accessibility-resource-type section section-light">
            <div className="accessibility-header">
              <h4 className="green-title">
                <span className="fa fa-tasks" aria-hidden="true"></span> Designated Supports
              </h4>
            </div>

            <div className="accessibility-dropdowns">
              <div className="accessibility-dropdown form-group selection-enabled">
                {this.renderTranslationLanguages()}
              </div>
              <div className="accessibility-dropdown form-group selection-enabled">
                {this.renderIllustrationOptions()}
              </div>
            </div>
          </div>
        </div>
      );
    }
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
          className="react-modal-content about-item-modal"
        >
          <div className="modal-wrapper" aria-labelledby="About Item Modal" aria-hidden="true">
            <div className="modal-header">
              <h4 className="modal-title">
                <h4> Choose Accessibility Options for Printout </h4>
              </h4>
              <button className="close" onClick={this.handleHideModal} aria-label="Close modal">
                <span className="fa fa-times" aria-hidden="true" />
              </button>
            </div>
            <div className="modal-body">
              <div className="status-message-print">
                <h5 className="accessibility-form-heading">
                  {" "}
                  Total Item(s) selected : {this.props.StatusMessage}
                </h5>{" "}
              </div>
              <form id="accessibility-form">
                <div className="accessibility-groups">
                  <div className="accessibility-resource-type section section-light">
                    <div className="accessibility-header">
                      <h4 className="green-title">
                        <span className="fa fa-tasks" aria-hidden="true"></span> Universal
                        Tools
                      </h4>
                    </div>
                    <div className="accessibility-dropdown form-group selection-enabled">
                      {this.renderGlossaryOptions()}
                    </div>
                  </div>
                </div>

                {this.renderDesignatedSupport()}

                {/* <div className="accessibility-groups">
                  <div className="accessibility-resource-type section section-light">
                    <div className="accessibility-dropdowns">
                      <div className="accessibility-dropdown form-group selection-enabled">
                        {this.renderTranslationLanguages()}
                      </div>
                      <div className="accessibility-dropdown form-group selection-enabled">
                        {this.renderIllustrationOptions()}
                      </div>
                    </div>
                  </div>
                </div> */}
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
                onClick={this.handlePrintItems}
              >
                Print Items to PDF
              </button>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}
