import * as React from "react";
import "../Assets/Styles/multi-select.less";
import { MultiSelectValue } from "@src/index";
import { DataFieldCheckBox } from "./DataFieldCheckbox";

import {
  UP_KEY,
  DOWN_KEY,
  getItemIndexInDirection,
  getFirstEnabledItem,
  getFirstSelectedItem,
  getButtonTextDetails
} from "../Select/SelectModel";
import ReactDOM = require("react-dom");

export interface MultiSelectProps {
  options: MultiSelectValue[];
  onChange: (v: MultiSelectValue[]) => void;
  uniqueId: number;
}

export interface MultiSelectState {
  toggleChange: number;
  multiSelectOptionsTemp: MultiSelectValue[];
}

export class DataFieldMultiSelect extends React.Component<
  MultiSelectProps,
  MultiSelectState
> {
  isOpenVar: boolean;
  wrapperRef: HTMLDivElement;
  setWrapperRef: any;
  node: React.RefObject<HTMLDivElement>;
  constructor(props: MultiSelectProps) {
    super(props);
    this.setWrapperRef = (element: HTMLDivElement) => {
      this.wrapperRef = element;
    };
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      toggleChange: 0,
      multiSelectOptionsTemp: this.props.options
    };
    this.isOpenVar = false;
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  handleClickOutside(event: { target: any }) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (this.isOpenVar) {
        this.isOpenVar = false;
        this.setState({
          toggleChange: this.state.toggleChange === 0 ? 1 : 0,
          multiSelectOptionsTemp: this.props.options
        });
      }
    }
  }

  onKeyPressOnButton = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.keyCode === 9) {
      if (document.activeElement) {
        const activeElementId = document.activeElement.id;
        if (
          activeElementId &&
          activeElementId === "btn_apply_customize_field"
        ) {
          console.log("tab pressed : ", document.activeElement.id);
          this.isOpenVar = false;
          this.setState({
            toggleChange: this.state.toggleChange === 0 ? 1 : 0
          });
        }
      }
    }
  };

  shiftFocus = (
    e: React.KeyboardEvent<HTMLElement>,
    currentFocusedElement: number
  ) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault();
      const currentFocus = document.activeElement;
      if (currentFocus !== null)
        document.getElementById(currentFocus.id)!.click();
    }
  };

  handleFocus = () => {
    const isOpen = this.isOpenVar;
    if (isOpen) {
      this.isOpenVar = false;
      this.setState({ toggleChange: this.state.toggleChange === 0 ? 1 : 0 });
    } else {
      this.isOpenVar = true;
      this.setState({ toggleChange: this.state.toggleChange === 0 ? 1 : 0 });
    }
  };

  handleValueChange = (option: MultiSelectValue) => {
    let multiSelectOptionsTemp = this.state.multiSelectOptionsTemp.slice();
    multiSelectOptionsTemp.forEach(element => {
      if (option.label === element.label) {
        element.selected = option.selected;
      }
    });
    // console.log(multiSelectOptionsTemp);
    // let changeOptionsArray: MultiSelectValue[] = [];
    // changeOptionsArray.push(option);
    // // this.props.onChange(changeOptionsArray);
    // this.setState({ toggleChange: this.state.toggleChange === 0 ? 1 : 0 });
  };

  onApplySetting = () => {
    this.props.onChange(this.state.multiSelectOptionsTemp);
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

  renderSelectMultiOptionsMenu = (optionsList: MultiSelectValue[]) => {
    const multiSelectOptions = optionsList.map((option, index) => (
      <li className="li-data-fields-customize">
        {this.renderSelectOption(option, index)}
      </li>
    ));
    return multiSelectOptions;
  };

  renderDropDown = () => {
    //Get ready with text to be displayed in toggle button
    let buttonText: string = this.getButtonText();

    return (
      <>
        <div
          className={`dropdown ${this.isOpenVar ? "open" : ""}`}
          ref={node => this.setWrapperRef(node)}
        >
          <button
            className="btn btn-default dropdown-toggle dropdown-toggle-btn"
            type="button"
            id={"dropdownMenuButton" + this.props.uniqueId}
            data-toggle="dropdown"
            aria-haspopup="true"
            onClick={this.handleFocus}
            onKeyDown={e => {
              this.onKeyPressOnButton(e);
            }}
            tabIndex={0}
          >
            <i className="fa fa-table" aria-hidden="true" />
          </button>
          {/* <div className="modal-backdrop"> */}
          <form
            className="dropdown-menu dropdown-menu-field-customizer"
            aria-labelledby={"dropdownMenuButton" + this.props.uniqueId}
            role="dialog"
          >
            <ul className="">
              {this.renderSelectMultiOptionsMenu(
                this.state.multiSelectOptionsTemp
              )}
            </ul>
            <div className="field-customizer-divider" />
            <div className="flex-data-field-popup">
              {/* btn to apply customize field setting; id is required for tacking active elements anytime */}
              <button
                className="btn btn-success "
                type="button"
                id="btn_apply_customize_field"
                onKeyDown={e => {
                  this.onKeyPressOnButton(e);
                }}
                onClick={this.onApplySetting}
              >
                Apply
              </button>
              <button
                type="button"
                className="btn btn-danger "
                id="btn_apply_customize_field"
                tabIndex={0}
              >
                cancel
              </button>
            </div>
          </form>
          {/* </div> */}
        </div>
      </>
    );
  };

  private getButtonText() {
    const buttonDetails = getButtonTextDetails(this.props.options);
    let buttonText: string;
    if (buttonDetails.selectedItemsCount === 0) {
      buttonText = "None selected";
    } else if (buttonDetails.isAllSelected) {
      buttonText = "All selected (" + buttonDetails.selectedItemsCount + ")";
    } else if (buttonDetails.selectedItemsCount === 1) {
      const firstSelectedItem = getFirstSelectedItem(this.props.options);
      buttonText =
        firstSelectedItem !== null ? firstSelectedItem : "1 selected";
      if (buttonText.length > 10) {
        buttonText = buttonText.replace(
          buttonText.substring(12, buttonText.length),
          " ..."
        );
      }
    } else {
      buttonText = buttonDetails.selectedItemsCount + " selected";
    }
    return buttonText;
  }

  render() {
    return <>{this.renderDropDown()}</>;
  }
}
