import * as React from "react";
import * as ReactModal from "react-modal";
import { SelectOptionProps, Select } from "@src/index";
import { getPrintDropdownOptions } from "./AccessibilityModels";

export interface PrintAccessibilityContainerProps {
  showModal: boolean;
  onChangeModelState: (modelShowState: boolean) => void;
  handleLanguageChange: (newLangCode: string) => void;
  handleIllustrationChange: (newIllustration: string) => void;
  handleGlossaryOptionChange: (newGlossaryOption: string) => void;
  handlePrintOptionChange: (newSelectedPrintOption: string) => void;
  selectedLangCode: string;
  selectedIllustration: string;
  selectedGlossary: string;
  selectedPrintOption: string;
  itemsInCartCount: string;
  StatusMessage: string;
  areSelectedItemsHaveMath: boolean;
  isInterimSite: boolean;
}
export interface pageState {
  areSelectedItemsHaveMath: boolean;
}

export class PrintAccessibilityModal extends React.Component<
  PrintAccessibilityContainerProps,
  pageState
> {
  constructor(props: PrintAccessibilityContainerProps) {
    super(props);
    this.state = {
      areSelectedItemsHaveMath: props.areSelectedItemsHaveMath
    };
  }

  componentWillReceiveProps(nextProps: PrintAccessibilityContainerProps) {
    this.setState({
      areSelectedItemsHaveMath: nextProps.areSelectedItemsHaveMath
    });
  }

  renderTranslationLanguages(): JSX.Element {
    const selectedLanguageCode = this.props.selectedLangCode;

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
          label="Translation (Stacked)"
          selected={selectedLanguageCode || ""}
          options={selectOptions}
          onChange={this.props.handleLanguageChange}
        />
      </>
    );
  }

  renderIllustrationOptions(): JSX.Element {
    const selectedIllustration = this.props.selectedIllustration;
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
        selected={selectedIllustration || ""}
        options={selectOptions}
        onChange={this.props.handleIllustrationChange}
      />
    );
  }

  renderGlossaryOptions(): JSX.Element {
    const selectedGlossary = this.props.selectedGlossary;
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
          selected={selectedGlossary || ""}
          options={selectOptions}
          onChange={this.props.handleGlossaryOptionChange}
        />
      </>
    );
  }

  //Render dropdown menu for Print options
  renderPrintDropdownOptions(): JSX.Element {
    const selectedPrintOption = this.props.selectedPrintOption;
    const selectOptions = getPrintDropdownOptions(selectedPrintOption);
    return (
      <>
        <Select
          className="select-print-accessibility form-control"
          label="PDF Content"
          selected={selectedPrintOption || ""}
          options={selectOptions}
          onChange={this.props.handlePrintOptionChange}
        />
      </>
    );
  }

  renderDesignatedSupport(): JSX.Element {
    if (!this.state.areSelectedItemsHaveMath) {
      return <></>;
    } else {
      return (
        <div className="accessibility-groups">
          <div className="accessibility-resource-type section section-light">
            <h4 className="green-title">
              <span className="fa fa-tasks" aria-hidden="true" /> Designated
              Supports
            </h4>
            <p className="font-italic">
              Note: These options only apply to math items.
            </p>

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

  //Render Print options
  renderPrintOptions(): JSX.Element {
    if (!this.props.isInterimSite) {
      return <></>;
    }
    return (
      <>
        <div className="header-message-print-cart header-print-cart">
          <span> Print Options</span> <br />
        </div>
        <form id="accessibility-form">
          <div className="accessibility-groups">
            <div className="accessibility-groups">
              <div className="accessibility-resource-type section section-light">
                <div className="accessibility-dropdowns">
                  <div className="accessibility-dropdown form-group selection-enabled">
                    {this.renderPrintDropdownOptions()}
                  </div>
                  <div className="error-msg-print">
                    <span className="error-msg-print-cart">
                      Please select any item from a Test Name to continue.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }

  render() {
    const modelState = this.props.showModal;
    return (
      <>
        <div className="header-message-print-cart">
          <span> Accessibility Options</span> <br />
        </div>
        <div className="accessibility-groups">
          <div className="accessibility-resource-type section section-light">
            <div className="accessibility-header">
              <h4 className="green-title">
                <span className="fa fa-tasks" aria-hidden="true" /> Universal
                Tools
              </h4>
            </div>

            <div className="accessibility-dropdowns">
              <div className="accessibility-dropdown form-group selection-enabled">
                {this.renderGlossaryOptions()}
              </div>
            </div>
          </div>
        </div>
        {this.renderDesignatedSupport()}
        {this.renderPrintOptions()}
      </>
    );
  }
}
