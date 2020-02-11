import * as React from "react";
import * as ReactModal from "react-modal";
import { SelectOptionProps, Select } from "@src/index";

export interface PrintAccessibilityContainerState {
  showModal: boolean;
  onChangeModelState: (modelShowState: boolean) => void;
  onSubmitPrint: (
    langCode?: string,
    GlossaryRequired?: string,
    IllustrationRequired?: string
  ) => void;
}
export interface pageState {
  selectedLangCode?: string;
  selectedIllustration?: string;
  selectedGlossary?: string;
}

export class PrintAccessibilityModal extends React.Component<
  PrintAccessibilityContainerState,
  pageState
> {
  constructor(props: PrintAccessibilityContainerState) {
    super(props);
    this.state = {
      selectedLangCode: "ENU",
      selectedIllustration: "false",
      selectedGlossary: "false"
    };
  }

  handleHideModal = () => {
    this.setState({
      selectedLangCode: "ENU",
      selectedIllustration: "false",
      selectedGlossary: "false"
    });
    this.props.onChangeModelState(false);
  };

  handlePrintItems = () => {
    this.props.onSubmitPrint(
      this.state.selectedLangCode,
      this.state.selectedGlossary,
      this.state.selectedIllustration
    );
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
      <Select
        label="Language"
        labelClass="hidden"
        selected={selectedLanguageCode || ""}
        options={selectOptions}
        onChange={this.handleLanguageChange}
      />
    );
  }

  renderIllustrationOptions(): JSX.Element {
    const selectedIllustration = this.state.selectedIllustration;
    const selectOptions: SelectOptionProps[] = [];
    selectOptions.push({
      label: "Illustration Glossary Off",
      value: "false",
      disabled: false,
      selected: selectedIllustration === "false"
    });

    selectOptions.push({
      label: "Illustration Glossary On",
      value: "True",
      disabled: false,
      selected: selectedIllustration === "true"
    });

    return (
      <Select
        label="Illustration"
        labelClass="hidden"
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
      label: "Glossary Off",
      value: "false",
      disabled: false,
      selected: selectedGlossary === "false"
    });

    selectOptions.push({
      label: "Glossary On",
      value: "True",
      disabled: false,
      selected: selectedGlossary === "True"
    });

    return (
      <Select
        label="Illustration"
        labelClass="hidden"
        selected={selectedGlossary || ""}
        options={selectOptions}
        onChange={this.handleGlossaryOptionChange}
      />
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
          className="react-modal-content about-item-modal"
        >
          <div
            className="modal-wrapper"
            aria-labelledby="About Item Modal"
            aria-hidden="true"
          >
            <div className="modal-header">
              <h4 className="modal-title">Accessibility Options</h4>
              <button
                className="close"
                onClick={this.handleHideModal}
                aria-label="Close modal"
              >
                <span className="fa fa-times" aria-hidden="true" />
              </button>
            </div>
            <div className="modal-body">
              {this.renderTranslationLanguages()}
              {this.renderGlossaryOptions()}
              {this.renderIllustrationOptions()}{" "}
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
                Submit
              </button>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}
