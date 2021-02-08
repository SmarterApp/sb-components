import * as React from "react";
import "../Assets/Styles/multi-select.less";
import { MultiSelectValue } from "@src/index";

export interface DataFieldCheckboxProps {
  option: MultiSelectValue;
  onValueChange: (option: MultiSelectValue) => void;
  uniqueId: number;
}

export interface DataFieldCheckboxState {
  isChecked: boolean;
}

export class DataFieldCheckBox extends React.Component<
  DataFieldCheckboxProps,
  DataFieldCheckboxState
> {
  constructor(props: DataFieldCheckboxProps) {
    super(props);
    this.state = {
      isChecked: this.props.option.selected
    };
  }

  handleUpdateOption = () => {
    this.props.onValueChange(this.props.option);
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      e.stopPropagation();
      e.preventDefault();
      if (
        this.props.option.disabled !== undefined &&
        this.props.option.disabled === true
      )
        return;
      this.handleUpdateOption();
    }
  };

  handleCheckBoxChange = (
    e: React.SyntheticEvent,
    option: MultiSelectValue
  ) => {
    e.stopPropagation();
    e.preventDefault();
    if (
      this.props.option.disabled !== undefined &&
      this.props.option.disabled === true
    )
      return;
    this.handleUpdateOption();
  };

  ariaLabelText = () => {
    let ariaLabel: string;
    if (
      this.props.option.disabled !== undefined &&
      this.props.option.disabled === true
    )
      ariaLabel = this.props.option.label + " disabled";
    else ariaLabel = this.props.option.label;
    return ariaLabel;
  };

  shouldDisabled = () => {
    if (
      this.props.option.disabled !== undefined &&
      this.props.option.disabled === true
    )
      return true;
    else return false;
  };

  render() {
    return (
      <label
        style={{ textAlign: "left" }}
        tabIndex={0}
        aria-disabled={this.shouldDisabled() ? true : false}
        role="checkbox"
        aria-checked={this.props.option.selected}
        aria-label={this.ariaLabelText()}
        id={`${this.props.option.value}${this.props.uniqueId}`}
        className={`checkbox-multi-select checkbox-data-fields-customize  btn ${
          this.shouldDisabled() ? " disabled" : " "
        }`}
        onClick={e => this.handleCheckBoxChange(e, this.props.option)}
        onKeyDown={e => {
          this.handleKeyDown(e);
        }}
      >
        <i
          style={{ marginRight: "4px" }}
          className={
            this.props.option.selected || this.props.option.isDefault
              ? "fa fa-check-square-o checkbox-fields-customize-checked"
              : "fa fa-square-o checkbox-fields-customize-unchecked"
          }
          aria-hidden="true"
        />
        {"  "}
        {this.props.option.label}
      </label>
    );
  }
}
