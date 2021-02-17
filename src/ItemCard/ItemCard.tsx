import * as React from "react";
import * as GradeLevels from "../GradeLevels/GradeLevels";
import { ItemCardModel } from "./ItemCardModels";
import { Redirect } from "react-router";
import { ToolTip, generateTooltip } from "../index";
import { getContentStandardCode } from "./ItemCardHelperFunction";
import { TestCodeToLabel } from "@src/ItemSearch/ItemSearchModels";

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

//props interface
export interface ItemCardProps {
  rowData: ItemCardModel;
  onRowSelect: (item: ItemCardModel) => void;
  getSelectedItemCount: () => number;
  showErrorModalOnPrintItemsCountExceeded: () => void;
  isPrintLimitEnabled: boolean;
  associatedItems: any[];
  countNumberOfItemsAfterSelection: (
    currentItems: ItemCardModel[],
    selectedItemsCount: number
  ) => number;
  isInterimSite: boolean;
  testCodeToLabelMap: TestCodeToLabel;
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

  shouldButtonBeDisabled = () => {
    if (
      this.props.rowData.selected === undefined ||
      this.props.rowData.selected === false
    ) {
      if (this.props.associatedItems !== undefined) {
        const associatedItems = this.props.associatedItems;
        const itemKey = this.props.rowData.itemKey;
        for (const itemKeyInAssociatedItems in associatedItems) {
          const associatedItemsArray =
            associatedItems[itemKeyInAssociatedItems];
          for (let i = 0; i < associatedItemsArray.length; i++) {
            if (associatedItemsArray[i][0].itemKey === itemKey) return true;
          }
        }
      }
    }
    return false;
  };

  handleTooltipKeyPress = (e: React.SyntheticEvent) => {
    const item = this.props.rowData;
    this.handleCheckBoxChange(item, e, this.shouldButtonBeDisabled());
  };

  shouldComponentUpdate(nextProps: ItemCardProps, nextState: ItemCardState) {
    // return nextState.redirect || nextState.isCheckBoxChanged;
    return true;
  }

  handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.keyCode === 13 || e.keyCode === 23) {
      this.setState({ redirect: true });
    }
  };

  handleCheckBoxChange = (
    item: ItemCardModel,
    e: React.SyntheticEvent,
    shouldButtonBeDisabled: boolean
  ) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (
      shouldButtonBeDisabled &&
      (item.selected === undefined || item.selected === false)
    ) {
      return;
    }
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;

    let selectedItemsCount = this.props.getSelectedItemCount();
    //check if selection items count exceed the limits
    let currentItems: ItemCardModel[] = [];
    currentItems[0] = item;
    const ItemsSelectionCountInAdvance = this.props.countNumberOfItemsAfterSelection(
      currentItems,
      selectedItemsCount
    );
    if (item.selected !== true && ItemsSelectionCountInAdvance > 50) {
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
    let testLabel = "";
    if (this.props.rowData.testName !== undefined) {
      testLabel = this.props.testCodeToLabelMap[this.props.rowData.testName];
    }

    const testNameDetails_tsx = () => {
      if (this.props.isInterimSite) {
        return (
          <>
            <p className="card-text test-name">
              <span className="card-text-label">Test name:</span>
              <span className="card-text-value"> {testLabel}</span>
            </p>
            <p className="card-text item-position-in-test">
              <span className="card-text-label">Item position in test:</span>
              <span className="card-text-value">
                {" "}
                {this.props.rowData.testOrder}
              </span>
            </p>
          </>
        );
      }
    };

    /**
     * Function related to print button view
     */
    const onBtnClickChangeIcon = () => {
      return this.props.rowData.selected === true
        ? "fa-check-square"
        : "fa-plus-square";
    };
    const cssForDisabledButton = () => {
      const _shouldBeDisabled = this.shouldButtonBeDisabled();
      if (_shouldBeDisabled) {
        return "btn-add-remove-disabled-print-selection";
      } else return "";
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

      const addOrRemoveIcon = () => {
        return this.props.rowData.selected === true ? "fa-minus" : "fa-plus";
      };
      const getToolTipMsg = () => {
        if (addOrRemoveIcon() === "fa-plus") return "Add item to print queue";
        else return "Remove item from print queue ";
      };

      // Tooltip for content standard
      const subjectCode = this.props.rowData.subjectCode;
      const claimCode = this.props.rowData.claimCode;
      let commonCoreStandardId = this.props.rowData.commonCoreStandardId;
      let ccssDescription = this.props.rowData.ccssDescription;
      //get the new and logically updated commonCoreStandardId, ccssDescription value
      const standard = getContentStandardCode(
        subjectCode,
        claimCode,
        commonCoreStandardId,
        ccssDescription
      );
      commonCoreStandardId = standard["commonCoreStandardId"];
      ccssDescription = standard["ccssDescription"];

      const tooltipCcontentStandard = generateTooltip({
        displayIcon: true,
        className: "box",
        helpText: <span>{ccssDescription}</span>,
        displayText: commonCoreStandardId
      });

      const addRemoveButton = (
        <button
          type="button"
          className={`btn btn-add-remove-print-selection ${this.props.rowData.subjectCode.toLowerCase()} ${onBtnClickChangeBtnStyleCss()} ${cssForDisabledButton()}`}
          onClick={e =>
            this.handleCheckBoxChange(
              this.props.rowData,
              e,
              this.shouldButtonBeDisabled()
            )
          }
          aria-hidden={true}
          tabIndex={-1}
          // onKeyUp={e => this.handleKeyUpEnterStopPropogation(e)}
          // onKeyDown={e => this.handleEnterKeyDown(e)}
        >
          <i className={"fa  " + onBtnClickChangeIcon()} />
          &nbsp;&nbsp;
          {selectOrSelectedBtnText()}
        </button>
      );

      const noteForDisabledAssocitedItemsButton = (
        shouldBeDisabled: boolean
      ) => {
        if (shouldBeDisabled)
          return (
            <>
              {"This is a Performance Task and must be selected as a group in a predefined sequence. PTs are designed as a complete activity to" +
                " measure a student’s ability to demonstrate critical-thinking," +
                " problem-solving skills and/or complex analysis, and writing and" +
                " research skills."}
            </>
          );
        else return <></>;
      };

      const AddRemoveButtonDisabled = (
        <ToolTip
          className="tooltip-item-card-button"
          helpText={noteForDisabledAssocitedItemsButton(
            this.shouldButtonBeDisabled()
          )}
          includeTabindex={true}
          onKeyPress={this.handleTooltipKeyPress}
          position="top"
        >
          {addRemoveButton}
        </ToolTip>
      );
      const AddRemoveButtonActive = (
        <ToolTip
          className="tooltip-item-card-button"
          helpText={<span>{getToolTipMsg()}</span>}
          includeTabindex={true}
          onKeyPress={this.handleTooltipKeyPress}
        >
          {addRemoveButton}
        </ToolTip>
      );

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
            {testNameDetails_tsx()}
            <p className="card-text stimulusid">
              <span className="card-text-label">Stimulus ID:</span>
              <span className="card-text-value">
                {" "}
                {this.props.rowData.stimulusKey}
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
            <p className="card-text target">
              <span className="card-text-label">Standard:</span>
              <span className="card-text-value">{tooltipCcontentStandard}</span>
            </p>
            <p className="card-text interaction-type">
              <span className="card-text-label">Item Type:</span>
              <span className="card-text-value">{` ${
                this.props.rowData.interactionTypeLabel
              }`}</span>
            </p>
            <p className="card-text item-id">
              <span className="card-text-label">Item Id:</span>
              <span className="card-text-value">
                {" "}
                {this.props.rowData.itemKey}
              </span>
            </p>
            {this.shouldButtonBeDisabled()
              ? AddRemoveButtonDisabled
              : AddRemoveButtonActive}
          </div>
        </div>
      );
    }

    return <>{content}</>;
  }
}
