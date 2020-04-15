import * as React from "react";
import * as GradeLevels from "../GradeLevels/GradeLevels";
import { ItemCardModel } from "./ItemCardModels";
import { Redirect } from "react-router";
import { ToolTip, generateTooltip } from "../index";
import { ErrorMessageModal } from "@src/ErrorBoundary/ErrorMessageModal";
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
  getSelectedItemCount: () => number;
  showErrorModalOnPrintItemsCountExceeded: () => void;
  isPrintLimitEnabled: boolean;
}

export interface ItemCardState {
  redirect: boolean;
  isCheckBoxChanged: boolean;
  isChecked: boolean;
  showErrorModal: boolean;
  statusMessage: string;
}

export class ItemCard extends React.Component<ItemCardProps, ItemCardState> {
  constructor(props: ItemCardProps) {
    super(props);
    this.state = {
      redirect: false,
      isChecked: false,
      isCheckBoxChanged: false,
      showErrorModal: false,
      statusMessage: ""
    };
  }

  shouldComponentUpdate(nextProps: ItemCardProps, nextState: ItemCardState) {
    // return nextState.redirect || nextState.isCheckBoxChanged;
    return true;
  }

  handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.keyCode === 13 || e.keyCode === 23) {
      this.setState({ redirect: true });
    }
  };

  handleCheckBoxChange = (item: ItemCardModel, e: React.SyntheticEvent) => {
    e.stopPropagation();
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    let selectedItemsCount = this.props.getSelectedItemCount();
    //check if selection items count exceed the limits
    if (
      item.selected !== true &&
      this.props.isPrintLimitEnabled == true &&
      selectedItemsCount >= 20
    ) {
      this.props.showErrorModalOnPrintItemsCountExceeded();
      return;
    } else {
      if (item.selected === true) item.selected = false;
      else item.selected = true;
      this.props.onRowSelect(item);
      //this.props.onItemSelection(item);
      this.setState({
        isChecked: value === true,
        isCheckBoxChanged: true
      });
    }
  };

  handleKeyUpEnterStopPropogation = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  handleEnterKeyDown = (e: React.KeyboardEvent) => {
    //if enter key is press prevent its default behaviour from selecting/clicking on elements
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  handleOnClick = () => {
    this.setState({ redirect: true });
  };

  handleHideErrorModal = () => {
    this.setState({ showErrorModal: false, statusMessage: "" });
  };

  render() {
    /**
     * Function related to print button view
     */
    const onBtnClickChangeIcon = () => {
      return this.props.rowData.selected === true
        ? "fa-check-square"
        : "fa-plus-square";
    };
    const onBtnClickChangeBtnStyleCss = () => {
      return this.props.rowData.selected === true
        ? " btn-selected"
        : " btn-unselected";
    };
    const selectOrSelectedBtnText = () => {
      return this.props.rowData.selected === true
        ? " Item Selected"
        : " Select to Print";
    };

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
            <button
              type="button"
              className={`btn btn-add-remove-print-selection ${this.props.rowData.subjectCode.toLowerCase()} ${onBtnClickChangeBtnStyleCss()}`}
              onClick={e => this.handleCheckBoxChange(this.props.rowData, e)}
              tabIndex={0}
              onKeyUp={e => this.handleKeyUpEnterStopPropogation(e)}
              onKeyDown={e => this.handleEnterKeyDown(e)}
            >
              <i className={"fa  " + onBtnClickChangeIcon()} />&nbsp;&nbsp;
              {selectOrSelectedBtnText()}
            </button>
          </div>
        </div>
      );
    }

    return (
      <>
        {/* {this.renderErrorModal()} */}
        {content}
      </>
    );
  }
}
