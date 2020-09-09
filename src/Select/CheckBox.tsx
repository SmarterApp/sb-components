import * as React from "react";
import "../Assets/Styles/multi-select.less";
import { MultiSelectValue } from "@src/index";

export interface MultiSelectProps {
  option: MultiSelectValue;
  onValueChange: (option: MultiSelectValue) => void;
  uniqueId: number;
}

export interface MultiSelectState {
  isChecked: boolean;
}

export class CheckBox extends React.Component<
  MultiSelectProps,
  MultiSelectState
> {
  constructor(props: MultiSelectProps) {
    super(props);
    this.state = {
      isChecked: this.props.option.selected
    };
  }

  handleUpdateOption = () => {
    console.log("Key down code");
    console.log("Before updating state ", this.props.option.selected);
    this.props.option.selected = this.props.option.selected ? false : true;

    this.setState({ isChecked: this.props.option.selected ? false : true });
    console.log("After updating state ", this.props.option.selected);
    this.props.onValueChange(this.props.option);
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    console.log("Key down");
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
        tabIndex={-1}
        aria-disabled={this.shouldDisabled() ? true : false}
        role="checkbox"
        aria-checked={this.props.option.selected}
        aria-label={this.ariaLabelText()}
        id={`${this.props.option.value}${this.props.uniqueId}`}
        className={`checkbox-multi-select btn ${
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
            this.props.option.selected
              ? "fa fa-check-square-o"
              : "fa fa-square-o"
          }
          aria-hidden="true"
        />
        {"  "}
        {this.props.option.label}
      </label>
    );
  }
}
