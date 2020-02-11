import * as React from "react";
import * as GradeLevels from "../GradeLevels/GradeLevels";
import { ItemCardModel } from "./ItemCardModels";
import { Redirect } from "react-router";
import { ToolTip, generateTooltip } from "../index";
// tslint:disable:no-require-imports
const claimIcons: { [claimCode: string]: string } = {
  MATH1: require("@sbac/sbac-ui-kit/src/images/math-1.svg"),
  MATH2: require("@sbac/sbac-ui-kit/src/images/math-2.svg"),
  MATH3: require("@sbac/sbac-ui-kit/src/images/math-3.svg"),
  MATH4: require("@sbac/sbac-ui-kit/src/images/math-4.svg"),
  ELA1: require("@sbac/sbac-ui-kit/src/images/ela-1.svg"),
  ELA2: require("@sbac/sbac-ui-kit/src/images/ela-2.svg"),
  ELA3: require("@sbac/sbac-ui-kit/src/images/ela-3.svg"),
  ELA4: require("@sbac/sbac-ui-kit/src/images/ela-4.svg")
};
// tslint:enable:no-require-imports

//Added by sonu => props interface
export interface ItemCardProps {
  rowData: ItemCardModel;
  onRowSelect: (item: ItemCardModel) => void;
}

export interface ItemCardState {
  redirect: boolean;
  isCheckBoxChanged: boolean;
  isChecked: boolean;
}

export class ItemCard extends React.Component<ItemCardProps, ItemCardState> {
  constructor(props: ItemCardProps) {
    super(props);
    this.state = {
      redirect: false,
      isChecked: false,
      isCheckBoxChanged: false
    };
  }

  shouldComponentUpdate(nextProps: ItemCardProps, nextState: ItemCardState) {
    return nextState.redirect || nextState.isCheckBoxChanged;
  }

  handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.keyCode === 13 || e.keyCode === 23) {
      this.setState({ redirect: true });
    }
  };

  handleCheckBoxChange = (item: ItemCardModel, e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    if (item.selected === true) item.selected = false;
    else item.selected = true;
    this.props.onRowSelect(item);
    //this.props.onItemSelection(item);
    this.setState({
      isChecked: value === true,
      isCheckBoxChanged: true
    });

    console.log(item);
  };

  handleOnClick = () => {
    this.setState({ redirect: true });
  };

  render() {
    const { bankKey, itemKey } = this.props.rowData;
    let content = <Redirect push to={`/Item/${bankKey}-${itemKey}`} />;
    if (!this.state.redirect) {
      const tooltip = generateTooltip({
        displayIcon: true,
        className: "box",
        helpText: <span>{this.props.rowData.targetDescription}</span>,
        displayText: this.props.rowData.targetId
      });

      const tooltip_printOption = generateTooltip({
        displayIcon: true,
        className: "box",
        helpText: <span>Select to print this item</span>,
        displayText: ""
      });

      content = (
        <div
          role="link"
          className={`card card-block ${this.props.rowData.subjectCode.toLowerCase()}`}
          onClick={this.handleOnClick}
          onKeyUp={this.handleKeyPress}
          tabIndex={0}
        >
          <div className="card-contents">
            <div className="card-header">
              <h4 className="card-title">{this.props.rowData.subjectLabel}</h4>
              <div className="card-icon-container">
                <span className="card-grade-tag card-icon">
                  {GradeLevels.GradeLevel.gradeCaseToShortString(
                    this.props.rowData.grade
                  )}
                </span>
                {/* <img
                  src={claimIcons[this.props.claimCode]}
                  alt={this.props.claimLabel}
                  className="card-icon"
                  width="32px"
                /> */}
              </div>
            </div>
            <p className="card-text grade">
              <span className="card-text-label">Grade:</span>
              <span className="card-text-value">
                {" "}
                {this.props.rowData.gradeLabel}
              </span>
            </p>
            <p className="card-text claim">
              <span className="card-text-label">Claim:</span>
              <span className="card-text-value">
                {" "}
                {this.props.rowData.claimLabel}
              </span>
            </p>
            <p className="card-text target">
              <span className="card-text-label">Target:</span>
              <span className="card-text-value">{tooltip}</span>
            </p>
            <p className="card-text interaction-type">
              <span className="card-text-label">Item Type:</span>
              <span className="card-text-value">
                {` ${this.props.rowData.interactionTypeLabel}`}
              </span>
            </p>
            <p className="card-text item-id">
              <span className="card-text-label">Item Id:</span>
              <span className="card-text-value">
                {" "}
                {this.props.rowData.itemKey}
              </span>
            </p>

            {/* Add checkbox for selecting item for printing */}

            <p className="card-text item-id">
              <span className="card-text-label">SELECT TO PRINT:</span>
              <span className="card-text-value">
                <label
                  className="custom-checkbox"
                  onClick={e => e.stopPropagation()}
                >
                  <input
                    name="isChecked"
                    type="checkbox"
                    checked={
                      this.props.rowData.selected === undefined
                        ? false
                        : this.props.rowData.selected
                    }
                    onClick={e => e.stopPropagation()}
                    onChange={e =>
                      this.handleCheckBoxChange(this.props.rowData, e)
                    }
                  />
                  <span className="checkmark" />
                </label>
              </span>
            </p>
          </div>
        </div>
      );
    }

    return content;
  }
}
