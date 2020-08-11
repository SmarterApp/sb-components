import * as React from "react";
import * as ReactModal from "react-modal";
import { SelectOptionProps, Select } from "@src/index";

export interface PrintAccessibilityContainerProps {
  showModal: boolean;
  onChangeModelState: (modelShowState: boolean) => void;
  handleLanguageChange: (newLangCode: string) => void;
  handleIllustrationChange: (newIllustration: string) => void;
  handleGlossaryOptionChange: (newGlossaryOption: string) => void;
  selectedLangCode: string;
  selectedIllustration: string;
  selectedGlossary: string;
  itemsInCartCount: string;
  StatusMessage: string;
  areSelectedItemsHaveMath: boolean;
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
    // if (nextProps.areSelectedItemsHaveMath !== this.props.areSelectedItemsHaveMath ) {
    this.setState({
      areSelectedItemsHaveMath: nextProps.areSelectedItemsHaveMath
    });
    // }
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
          aria-label="Translation (Stacked)"
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
        aria-label="Illustration Glossary"
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
          aria-label="English Glossary"
          tabIndex={0}
          selected={selectedGlossary || ""}
          options={selectOptions}
          onChange={this.props.handleGlossaryOptionChange}
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

  render() {
    const modelState = this.props.showModal;
    return (
      <>
        <div className="accessibility-groups">
          <div className="accessibility-resource-type section section-light">
            <div className="accessibility-header">
              <h4 className="green-title">
                <span
                  className="fa fa-tasks"
                  aria-hidden="true"
                  aria-label="Universal Tools"
                  // tabIndex={0}
                />
                Universal Tools
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
      </>
    );
  }
}
