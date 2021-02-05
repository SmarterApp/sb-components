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
  shouldReRender: (shouldReRnder: boolean) => void;
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
      multiSelectOptionsTemp: JSON.parse(JSON.stringify(this.props.options))
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
          multiSelectOptionsTemp: JSON.parse(JSON.stringify(this.props.options))
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

  //remove it after testing
  ifIncludes = (x: string, arr: string[]) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].toUpperCase() === x.toUpperCase()) return true;
    }
    return false;
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
    return (
      <>
        <div
          className={`dropdown ${this.isOpenVar ? "open" : ""}`}
          ref={node => this.setWrapperRef(node)}
        >
          <button
            className="btn btn-default dropdown-toggle dropdown-toggle-btn dropdown-toggle-btn-customize-field"
            type="button"
            id={"dropdownMenuButton" + this.props.uniqueId}
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-label="Customize the fields"
            onClick={this.handleFocus}
            onKeyDown={e => {
              this.onKeyPressOnButton(e);
            }}
            tabIndex={0}
          >
            <i className="fa fa-list" aria-hidden="true" />
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
              <button
                type="button"
                aria-label="Cancel the setting"
                className="btn btn-danger "
                id="btn_cancel_customize_field"
                onClick={this.onCancelSetting}
              >
                Cancel
              </button>

              {/* btn to apply customize field setting; id is required for tacking active elements anytime */}
              <button
                className="btn btn-success "
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
          {/* </div> */}
        </div>
      </>
    );
  };

  render() {
    return <>{this.renderDropDown()}</>;
  }
}
