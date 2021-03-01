import * as React from "react";
import "../Assets/Styles/multi-select.less";
import { MultiSelectValue } from "@src/index";
import { DataFieldCheckBox } from "./DataFieldCheckbox";
import { getFirstEnabledItem } from "@src/Select/SelectModel";

export interface DataFieldMultiSelectProps {
  options: MultiSelectValue[];
  onChange: (v: MultiSelectValue[]) => void;
  uniqueId: number;
}

export interface DataFieldMultiSelectState {
  toggleChange: number;
  multiSelectOptionsTemp: MultiSelectValue[];
}

export class DataFieldMultiSelect extends React.Component<
  DataFieldMultiSelectProps,
  DataFieldMultiSelectState
> {
  isOpenVar: boolean;
  wrapperRef: HTMLDivElement;
  setWrapperRef: any;
  node: React.RefObject<HTMLDivElement>;
  constructor(props: DataFieldMultiSelectProps) {
    super(props);
    this.setWrapperRef = (element: HTMLDivElement) => {
      this.wrapperRef = element;
    };
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      toggleChange: 0,
      multiSelectOptionsTemp: JSON.parse(JSON.stringify(this.props.options))
    };
    this.isOpenVar = false;
  }

  /*  Add event listener for mouse click
      This will help in capturuing mouse click outside of the multiselect popup menu
  */

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
    document.addEventListener(
      "keydown",
      e => {
        this.escKeyPressed(e.key);
      },
      false
    );
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
    document.removeEventListener(
      "keydown",
      e => {
        this.escKeyPressed(e.key);
      },
      false
    );
  }

  /*Close the multiselect popup when user click outside of popup menu*/
  handleClickOutside(event: { target: any }) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (this.isOpenVar) {
        this.isOpenVar = false;
        this.setState({
          toggleChange: this.state.toggleChange === 0 ? 1 : 0,
          multiSelectOptionsTemp: JSON.parse(JSON.stringify(this.props.options))
        });
      }
    }
  }

  /*Close the multiselect popup when escape key is pressed*/
  escKeyPressed(key: string) {
    if (key === "Escape") {
      if (this.isOpenVar) {
        this.isOpenVar = false;
        this.setState({
          toggleChange: this.state.toggleChange === 0 ? 1 : 0,
          multiSelectOptionsTemp: JSON.parse(JSON.stringify(this.props.options))
        });
      }
    }
  }

  /*close the popup on pressing tab on last element i.e., apply setting button
    this will help in maintaining good accessiblity feature
  */

  onKeyPressOnButton = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.keyCode === 9) {
      if (document.activeElement) {
        const activeElementId = document.activeElement.id;
        if (
          activeElementId &&
          activeElementId === "btn_apply_customize_field"
        ) {
          this.isOpenVar = false;
          this.setState({
            toggleChange: this.state.toggleChange === 0 ? 1 : 0,
            multiSelectOptionsTemp: JSON.parse(
              JSON.stringify(this.props.options)
            )
          });
        }
      }
    }
  };

  /** Open multiselect popup on click of the btn */
  handleFocus = () => {
    const isOpen = this.isOpenVar;
    if (isOpen) {
      this.isOpenVar = false;
      this.setState({ toggleChange: this.state.toggleChange === 0 ? 1 : 0 });
    } else {
      this.isOpenVar = true;
      this.setState(
        { toggleChange: this.state.toggleChange === 0 ? 1 : 0 },
        () => {
          this.focusFirstOption();
        }
      );
    }
  };

  focusFirstOption = () => {
    const firstFocusableIndex = getFirstEnabledItem(this.props.options);
    if (
      firstFocusableIndex !== -1 &&
      firstFocusableIndex < this.props.options.length
    ) {
      const elementId =
        this.props.options[firstFocusableIndex].value +
        this.props.uniqueId.toString();
      const element = document.getElementById(elementId);
      document.getElementById(elementId)!.focus();
    }
  };

  handleValueChange = (option: MultiSelectValue) => {
    let multiSelectOptionsTemp: MultiSelectValue[] = JSON.parse(
      JSON.stringify(this.state.multiSelectOptionsTemp)
    );
    multiSelectOptionsTemp.forEach(element => {
      if (option.label === element.label) {
        element.selected = !option.selected;
      }
    });
    this.setState({ multiSelectOptionsTemp: multiSelectOptionsTemp });
  };

  /** Apply selected/unselected multiselect option's setting  */
  onApplySetting = () => {
    this.props.onChange(this.state.multiSelectOptionsTemp);
    this.isOpenVar = false;
    this.setState({
      toggleChange: this.state.toggleChange === 0 ? 1 : 0
    });
  };

  renderSelectOption = (option: MultiSelectValue, index: number) => {
    return (
      <label
        className={`multiselect-option-label ${
          option.disabled && option.disabled === true ? "disabled " : " "
        }`}
      >
        <DataFieldCheckBox
          option={option}
          key={index}
          onValueChange={this.handleValueChange}
          uniqueId={this.props.uniqueId}
        />
      </label>
    );
  };

  onCancelSetting = () => {
    this.isOpenVar = false;
    this.setState({
      toggleChange: this.state.toggleChange === 0 ? 1 : 0,
      multiSelectOptionsTemp: JSON.parse(JSON.stringify(this.props.options))
    });
  };

  renderSelectMultiOptionsMenu = (optionsList: MultiSelectValue[]) => {
    const multiSelectOptions = optionsList.map(
      (option, index) =>
        !option.shouldHidden ? (
          <li className="li-data-fields-customize">
            {this.renderSelectOption(option, index)}
          </li>
        ) : null
    );
    return multiSelectOptions;
  };

  renderDropDown = () => {
    return (
      <>
        <div
          className={`dropdown ${this.isOpenVar ? "open" : ""}`}
          ref={node => this.setWrapperRef(node)}
        >
          <button
            className="btn btn-default btn-sm search-result-container-header-button"
            type="button"
            id={"popupMenuButton" + this.props.uniqueId}
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-label="Customize view"
            onClick={this.handleFocus}
            onKeyDown={e => {
              this.onKeyPressOnButton(e);
            }}
            tabIndex={0}
          >
            Customize View
          </button>
          <form
            className="dropdown-menu dropdown-menu-field-customizer"
            aria-labelledby={"popupMenuButton" + this.props.uniqueId}
            role="dialog"
            aria-label={"Customize view popup modal opened"}
          >
            <ul className="">
              {this.renderSelectMultiOptionsMenu(
                this.state.multiSelectOptionsTemp
              )}
            </ul>
            <div className="field-customizer-divider" />
            <div className="flex-data-field-popup">
              <button
                type="button"
                aria-label="Cancel the setting"
                className="btn btn-default btn-sm btn-cancel-customize-view-setting"
                id="btn_cancel_customize_field"
                onClick={this.onCancelSetting}
              >
                Cancel
              </button>

              {/* btn to apply customize field setting; id is required for tacking active elements anytime */}
              <button
                className="btn btn-primary btn-sm btn-apply-customize-view-setting"
                aria-label="Apply the setting"
                type="button"
                id="btn_apply_customize_field"
                onKeyDown={e => {
                  this.onKeyPressOnButton(e);
                }}
                onClick={this.onApplySetting}
              >
                Apply
              </button>
            </div>
          </form>
        </div>
      </>
    );
  };

  render() {
    return <>{this.renderDropDown()}</>;
  }
}
