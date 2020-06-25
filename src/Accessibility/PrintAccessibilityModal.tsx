import * as React from "react";
import * as ReactModal from "react-modal";
import { SelectOptionProps, Select } from "@src/index";
import {
  AccResourceGroupModel,
  mapTranslationGlossaryOptions
} from "./AccessibilityModels";
import { DropDownSelectionModel } from "lib/src";

export interface PrintAccessibilityContainerProps {
  showModal: boolean;
  onChangeModelState: (modelShowState: boolean) => void;
  handleLanguageChange: (newLangCode: string) => void;
  handleIllustrationChange: (newIllustration: string) => void;
  handleGlossaryOptionChange: (newGlossaryOption: string) => void;
  handleTranslationGlossaryChange: (newTranslationGlossary: string) => void;
  selectedLangCode: string;
  selectedIllustration: string;
  selectedGlossary: string;
  selectedTranslationGlossary: string;
  itemsInCartCount: string;
  StatusMessage: string;
  areSelectedItemsHaveMath: boolean;
  translationAccessibility?: DropDownSelectionModel[];
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
          // labelClass="hidden"
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
        //labelClass="hidden"
        selected={selectedIllustration || ""}
        options={selectOptions}
        onChange={this.props.handleIllustrationChange}
      />
    );
  }

  //Render dropdown for translation glossary under designated support section
  renderTranslationGlossary(): JSX.Element {
    const transalatedGlossary = this.props.selectedTranslationGlossary;
    // const selectOptions = translationGlossaryOptions(transalatedGlossary);
    let selectOptions: SelectOptionProps[] = [];
    if (this.props.translationAccessibility) {
      // const designatedAccessibility = this.props.accessibility.filter(x => x.label === "Designated Supports");
      // const designatedAccessibilitySelection = designatedAccessibility[0].accessibilityResources.filter(x => x.resourceCode === "Translation")[0].selections;
      selectOptions = mapTranslationGlossaryOptions(
        transalatedGlossary,
        this.props.translationAccessibility
      );
    }

    return (
      <>
        <Select
          className="select-print-accessibility form-control"
          label="Translations (Glossaries)"
          //labelClass="hidden"
          selected={transalatedGlossary || ""}
          disabled={selectOptions.length > 0 ? false : true}
          options={selectOptions}
          onChange={this.props.handleTranslationGlossaryChange}
        />
      </>
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
          //labelClass="hidden"
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
                {this.renderTranslationGlossary()}
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
      </>
    );
  }
}
