import * as React from "react";
import { ColumnGroup, ItemCardModel } from "@src/index";
import { generateTooltip } from "../index";
import { getContentStandardCode } from "@src/ItemCard/ItemCardHelperFunction";
import {
  TestCodeToLabel,
  ItemIdToTestNameMap,
  TestNameAndPosition
} from "@src/ItemSearch/ItemSearchModels";
import { ItemColumnHeadersConfig } from "@src/SearchResultContainer/SearchResultModels";

export interface PrintCartItemTableRowProps {
  ItemCard: ItemCardModel;
  TotalItemsCard: ItemCardModel[];
  associatedItemsInPrintCart?: any;
  onAddOrRemoveSelectedItems: (item: ItemCardModel) => void;
  onItemsReorder: (i: number, j: number) => void;
  columns: ColumnGroup[];
  isLinkTable: boolean;
  itemSequence: number;
  index: number;
  isInterimSite: boolean;
  testCodeToLabelMap: TestCodeToLabel;
  itemIdToTestNameMap: ItemIdToTestNameMap;
  itemTableConfig: ItemColumnHeadersConfig[];
}

export interface PrintCartItemTableRowState {}

export class PrintCartItemTableRow extends React.Component<
  PrintCartItemTableRowProps,
  PrintCartItemTableRowState
> {
  constructor(props: PrintCartItemTableRowProps) {
    super(props);
    this.state = {};
  }

  handleOnUpArrowClick = () => {
    const currentIndex = this.props.index;
    this.props.onItemsReorder(currentIndex, currentIndex - 1);
  };
  handleOnDownArrowClick = () => {
    const currentIndex = this.props.index;
    this.props.onItemsReorder(currentIndex, currentIndex + 1);
  };

  onAddOrRemoveSelectedItems = (item: ItemCardModel) => {
    item.selected = item.selected === true ? false : true;
    this.props.onAddOrRemoveSelectedItems(item);
  };

  renderActionButton = (item: ItemCardModel) => {
    let sequence = this.props.itemSequence;
    return (
      <>
        <button
          className="btn btn-sm btn-danger btn-remove-item-print-cart"
          aria-label="Remove selected item from print cart"
          onClick={() => this.onAddOrRemoveSelectedItems(item)}
        >
          X
        </button>
        {/* <span className="item-sequence">
          {item.isPerformanceItem ? "-" : sequence}
        </span> */}
      </>
    );
  };
  renderTableHeader() {}

  getContentStandardToolTip(
    subjectCode: any,
    claimCode: any,
    commonCoreStandardId: any,
    ccssDescription: any
  ) {
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
      displayText: ""
    });
    return (
      <>
        <span>{commonCoreStandardId} </span>
        <span>{tooltipCcontentStandard}</span>
      </>
    );
  }

  renderToolTipForAssociatedGroupItems = (item: any) => {
    return <>{this.getToolTipForAssociatedGroupItems()}</>;
  };

  getToolTipForAssociatedGroupItems() {
    const MsgForAssociatedItems =
      "This is a Performance Task and must be selected as a group in a predefined sequence. PTs are designed as a complete activity to measure a student’s ability to demonstrate critical-thinking, problem-solving skills and/or complex analysis, and writing and research skills.";
    const tooltipCcontentStandard = generateTooltip({
      displayIcon: true,
      className: "box",
      helpText: <span>{MsgForAssociatedItems}</span>,
      displayText: "",
      position: "top"
    });
    return tooltipCcontentStandard;
  }

  getToolTipForTarget(targetId: string, targetDescription: string) {
    const tooltipCcontentStandard = generateTooltip({
      displayIcon: true,
      className: "box",
      helpText: <span>{targetDescription}</span>,
      displayText: targetId
    });
    return tooltipCcontentStandard;
  }

  //Render Performance task associated items in a group
  renderAssociatedItemsInGroup() {
    let itemSequence = this.props.itemSequence;
    if (this.props.associatedItemsInPrintCart !== undefined) {
      return this.props.associatedItemsInPrintCart.map(
        (
          item: {
            itemKey: any;
            subjectLabel: any;
            gradeLabel: any;
            claimLabel: any;
            interactionTypeLabel: any;
            subjectCode: any;
            claimCode: any;
            commonCoreStandardId: any;
            ccssDescription: any;
            targetId: any;
            targetDescription: any;
            isPerformanceItem: any;
            testNameInPrintCart: string;
            testOrderInPrintCart: number;
            stimulusKey: number;
            depthOfKnowledge: string | undefined;
            itemDifficulty: string;
          }[]
        ) => {
          return (
            <tr key={item[0].itemKey} className="table-row-associated-item">
              {this.props.isInterimSite
                ? this.renderPTitemsForInterim(item, itemSequence++)
                : this.renderPTitemsForNonInterim(item, itemSequence++)}
            </tr>
          );
        }
      );
    } else {
      return null;
    }
  }

  //Render PT associated items fro Interim in a group
  renderPTitemsForInterim(item: any, itemSequence: number) {
    const testNameAndPosition: TestNameAndPosition = getItemTestNameAndPosition(
      item[0].itemKey,
      item[0].testNameInPrintCart,
      item[0].testOrderInPrintCart,
      this.props.itemIdToTestNameMap,
      this.props.testCodeToLabelMap
    );

    let showSubject = true,
      showGrade = true,
      showStimulusKey = true,
      showClaimLabel = true,
      showTarget = true,
      showStandard = true,
      showDOK = true;
    let showItemPositioninTest = true,
      showTestName = true,
      showDifficulty = true;
    this.props.itemTableConfig.forEach(element => {
      showStimulusKey =
        element.headerName.toUpperCase() == "Stimulus ID".toUpperCase()
          ? !element.isHidden
          : showStimulusKey;
      showItemPositioninTest =
        element.headerName.toUpperCase() ==
        "Item position in test".toUpperCase()
          ? !element.isHidden
          : showItemPositioninTest;
      showSubject =
        element.headerName.toUpperCase() == "Subject".toUpperCase()
          ? !element.isHidden
          : showSubject;
      showGrade =
        element.headerName.toUpperCase() == "Grade".toUpperCase()
          ? !element.isHidden
          : showGrade;
      showTestName =
        element.headerName.toUpperCase() == "Test name".toUpperCase()
          ? !element.isHidden
          : showTestName;
      showClaimLabel =
        element.headerName.toUpperCase() == "Claim".toUpperCase()
          ? !element.isHidden
          : showClaimLabel;
      showTarget =
        element.headerName.toUpperCase() == "Target".toUpperCase()
          ? !element.isHidden
          : showTarget;
      showStandard =
        element.headerName.toUpperCase() == "Standard".toUpperCase()
          ? !element.isHidden
          : showStandard;
      showDOK =
        element.headerName.toUpperCase() == "DOK".toUpperCase()
          ? !element.isHidden
          : showDOK;
      showDifficulty =
        element.headerName.toUpperCase() == "Difficulty".toUpperCase()
          ? !element.isHidden
          : showDifficulty;
    });
    return (
      <>
        <td>{this.renderToolTipForAssociatedGroupItems(item[0])}</td>
        <td>{!item[0].isPerformanceItem ? "-" : itemSequence}</td>
        <td>{item[0].itemKey}</td>
        <>{showStimulusKey && <td>{item[0].stimulusKey}</td>}</>
        <>
          {showSubject && <td>{mapItemSubjectlabel(item[0].subjectLabel)}</td>}
        </>
        <>{showGrade && <td>{mapItemGrade(item[0].gradeLabel)}</td>}</>
        <>{showTestName && <td>{testNameAndPosition.testName}</td>}</>
        <>
          {showItemPositioninTest && (
            <td>
              {testNameAndPosition.testOrder === Number.MIN_VALUE
                ? ""
                : testNameAndPosition.testOrder}
            </td>
          )}
        </>
        <>{showClaimLabel && <td>{mapItemClaim(item[0].claimLabel)}</td>}</>
        <>
          {showTarget && (
            <td>
              {this.getToolTipForTarget(
                item[0].targetId,
                item[0].targetDescription
              )}
            </td>
          )}
        </>
        <>
          {showStandard && (
            <td>
              {this.getContentStandardToolTip(
                item[0].subjectCode,
                item[0].claimCode,
                item[0].commonCoreStandardId,
                item[0].ccssDescription
              )}
            </td>
          )}
        </>
        <>{showDOK && <td>{item[0].depthOfKnowledge}</td>}</>
        <>{showDifficulty && <td> {item[0].itemDifficulty}</td>}</>
      </>
    );
  }

  //Render PT associated items for non-interim in a group
  renderPTitemsForNonInterim(item: any, itemSequence: number) {
    let showSubject = true,
      showGrade = true,
      showStimulusKey = true,
      showClaimLabel = true,
      showTarget = true,
      showStandard = true,
      showTnteractionType = true;

    this.props.itemTableConfig.forEach(element => {
      showSubject =
        element.headerName.toUpperCase() == "Subject".toUpperCase()
          ? !element.isHidden
          : showSubject;
      showGrade =
        element.headerName.toUpperCase() == "Grade".toUpperCase()
          ? !element.isHidden
          : showGrade;
      showStimulusKey =
        element.headerName.toUpperCase() == "Stimulus ID".toUpperCase()
          ? !element.isHidden
          : showStimulusKey;
      showClaimLabel =
        element.headerName.toUpperCase() == "Claim".toUpperCase()
          ? !element.isHidden
          : showClaimLabel;
      showTarget =
        element.headerName.toUpperCase() == "Target".toUpperCase()
          ? !element.isHidden
          : showTarget;
      showStandard =
        element.headerName.toUpperCase() == "Standard".toUpperCase()
          ? !element.isHidden
          : showStandard;
      showTnteractionType =
        element.headerName.toUpperCase() == "Item Type".toUpperCase()
          ? !element.isHidden
          : showTnteractionType;
    });

    return (
      <>
        <td>{this.renderToolTipForAssociatedGroupItems(item[0])}</td>
        <td>{!item[0].isPerformanceItem ? "-" : itemSequence}</td>
        <td>{item[0].itemKey}</td>
        <>{showStimulusKey && <td>{item[0].stimulusKey}</td>}</>
        <>
          {showSubject && <td>{mapItemSubjectlabel(item[0].subjectLabel)}</td>}
        </>
        <>{showGrade && <td>{mapItemGrade(item[0].gradeLabel)}</td>}</>

        <>{showClaimLabel && <td>{mapItemClaim(item[0].claimLabel)}</td>}</>
        <>
          {showTarget && (
            <td>
              {this.getToolTipForTarget(
                item[0].targetId,
                item[0].targetDescription
              )}
            </td>
          )}
        </>
        <>
          {showStandard && (
            <td>
              {this.getContentStandardToolTip(
                item[0].subjectCode,
                item[0].claimCode,
                item[0].commonCoreStandardId,
                item[0].ccssDescription
              )}
            </td>
          )}
        </>
        <>{showTnteractionType && <td>{item[0].interactionTypeLabel}</td>}</>
      </>
    );
  }

  //Render test name & test order of a item in a table cell
  renderTestName(item: ItemCardModel) {
    if (this.props.isInterimSite) {
      let testLabel = "";
      if (item.testNameInPrintCart !== undefined) {
        testLabel = this.props.testCodeToLabelMap[item.testNameInPrintCart];
      }
      return (
        <>
          <td>{testLabel}</td>
        </>
      );
    }
  }

  renderTableRowItemsForInterim(item: ItemCardModel) {
    const testNameAndPosition: TestNameAndPosition = getItemTestNameAndPosition(
      item.itemKey,
      item.testNameInPrintCart,
      item.testOrderInPrintCart,
      this.props.itemIdToTestNameMap,
      this.props.testCodeToLabelMap
    );

    let showSubject = true,
      showGrade = true,
      showStimulusKey = true,
      showClaimLabel = true,
      showTarget = true,
      showStandard = true,
      showDOK = true;
    let showItemPositioninTest = true,
      showTestName = true,
      showDifficulty = true;
    this.props.itemTableConfig.forEach(element => {
      showStimulusKey =
        element.headerName.toUpperCase() == "Stimulus ID".toUpperCase()
          ? !element.isHidden
          : showStimulusKey;
      showItemPositioninTest =
        element.headerName.toUpperCase() ==
        "Item position in test".toUpperCase()
          ? !element.isHidden
          : showItemPositioninTest;
      showSubject =
        element.headerName.toUpperCase() == "Subject".toUpperCase()
          ? !element.isHidden
          : showSubject;
      showGrade =
        element.headerName.toUpperCase() == "Grade".toUpperCase()
          ? !element.isHidden
          : showGrade;
      showTestName =
        element.headerName.toUpperCase() == "Test name".toUpperCase()
          ? !element.isHidden
          : showTestName;
      showClaimLabel =
        element.headerName.toUpperCase() == "Claim".toUpperCase()
          ? !element.isHidden
          : showClaimLabel;
      showTarget =
        element.headerName.toUpperCase() == "Target".toUpperCase()
          ? !element.isHidden
          : showTarget;
      showStandard =
        element.headerName.toUpperCase() == "Standard".toUpperCase()
          ? !element.isHidden
          : showStandard;
      showDOK =
        element.headerName.toUpperCase() == "DOK".toUpperCase()
          ? !element.isHidden
          : showDOK;
      showDifficulty =
        element.headerName.toUpperCase() == "Difficulty".toUpperCase()
          ? !element.isHidden
          : showDifficulty;
    });

    return (
      <>
        <td className="td-print-cart-item-sequence">
          {this.renderActionButton(item)}
        </td>
        <td className="td-print-cart-item-sequence">
          {item.isPerformanceItem ? "-" : this.props.itemSequence}
        </td>
        <td>{item.itemKey}</td>
        <>{showStimulusKey && <td>{item.stimulusKey}</td>}</>
        <>{showSubject && <td>{mapItemSubjectlabel(item.subjectLabel)}</td>}</>
        <>{showGrade && <td>{mapItemGrade(item.gradeLabel)}</td>}</>
        <>{showTestName && <td>{testNameAndPosition.testName}</td>}</>
        <>
          {showItemPositioninTest && (
            <td>
              {testNameAndPosition.testOrder === Number.MIN_VALUE
                ? ""
                : testNameAndPosition.testOrder}
            </td>
          )}
        </>
        <>{showClaimLabel && <td>{mapItemClaim(item.claimLabel)}</td>}</>
        <>
          {showTarget && (
            <td>
              {this.getToolTipForTarget(item.targetId, item.targetDescription)}
            </td>
          )}
        </>
        <>
          {showStandard && (
            <td>
              {this.getContentStandardToolTip(
                item.subjectCode,
                item.claimCode,
                item.commonCoreStandardId,
                item.ccssDescription
              )}
            </td>
          )}
        </>
        <>{showDOK && <td>{item.depthOfKnowledge}</td>}</>
        <>{showDifficulty && <td>{item.itemDifficulty}</td>}</>
      </>
    );
  }

  renderTableRowItemsForNonInterim(item: ItemCardModel) {
    let showSubject = true,
      showGrade = true,
      showStimulusKey = true,
      showClaimLabel = true,
      showTarget = true,
      showStandard = true,
      showTnteractionType = true;

    this.props.itemTableConfig.forEach(element => {
      showStimulusKey =
        element.headerName.toUpperCase() == "Stimulus ID".toUpperCase()
          ? !element.isHidden
          : showStimulusKey;
      showSubject =
        element.headerName.toUpperCase() == "Subject".toUpperCase()
          ? !element.isHidden
          : showSubject;
      showGrade =
        element.headerName.toUpperCase() == "Grade".toUpperCase()
          ? !element.isHidden
          : showGrade;
      showClaimLabel =
        element.headerName.toUpperCase() == "Claim".toUpperCase()
          ? !element.isHidden
          : showClaimLabel;
      showTarget =
        element.headerName.toUpperCase() == "Target".toUpperCase()
          ? !element.isHidden
          : showTarget;
      showStandard =
        element.headerName.toUpperCase() == "Standard".toUpperCase()
          ? !element.isHidden
          : showStandard;
      showTnteractionType =
        element.headerName.toUpperCase() == "Item Type".toUpperCase()
          ? !element.isHidden
          : showTnteractionType;
    });

    return (
      <>
        <td className="td-print-cart-item-sequence">
          {this.renderActionButton(item)}
        </td>
        <td className="td-print-cart-item-sequence">
          {item.isPerformanceItem ? "-" : this.props.itemSequence}
        </td>
        <td>{item.itemKey}</td>
        <>{showStimulusKey && <td>{item.stimulusKey}</td>}</>
        <>{showSubject && <td>{mapItemSubjectlabel(item.subjectLabel)}</td>}</>
        <>{showGrade && <td>{mapItemGrade(item.gradeLabel)}</td>}</>

        <>{showClaimLabel && <td>{mapItemClaim(item.claimLabel)}</td>}</>
        <>
          {showTarget && (
            <td>
              {this.getToolTipForTarget(item.targetId, item.targetDescription)}
            </td>
          )}
        </>
        <>
          {showStandard && (
            <td>
              {this.getContentStandardToolTip(
                item.subjectCode,
                item.claimCode,
                item.commonCoreStandardId,
                item.ccssDescription
              )}
            </td>
          )}
        </>
        <>{showTnteractionType && <td>{item.interactionTypeLabel}</td>}</>
      </>
    );
  }

  render() {
    const shouldOrderingButtonBeDisabled = (arrowButtonaName: string) => {
      const currentItemIndex = this.props.index;
      const TotalItemsCard_length = this.props.TotalItemsCard.length;
      if (arrowButtonaName === "UpArrowButton" && currentItemIndex === 0) {
        return "disabled";
      }
      if (
        arrowButtonaName === "DownArrowButton" &&
        currentItemIndex === TotalItemsCard_length - 1
      ) {
        return "disabled";
      }
      return "";
    };
    const item = this.props.ItemCard;
    return (
      <>
        <tr key={item.itemKey} className={""}>
          {this.props.isInterimSite
            ? this.renderTableRowItemsForInterim(item)
            : this.renderTableRowItemsForNonInterim(item)}
          <td className="print-cart-action-btn">
            <div className="btn-group">
              <button
                type="button"
                onClick={this.handleOnUpArrowClick}
                aria-label="Move item up"
                aria-disabled={
                  shouldOrderingButtonBeDisabled("UpArrowButton") === "disabled"
                    ? true
                    : false
                }
                className={`btn btn-sm btn-primary ${shouldOrderingButtonBeDisabled(
                  "UpArrowButton"
                )}`}
                id={
                  shouldOrderingButtonBeDisabled("UpArrowButton") === "disabled"
                    ? "disabled-move-item-btn"
                    : "move-item-btn"
                }
              >
                <i className="fa fa-arrow-up" />
              </button>
              <button
                type="button"
                onClick={this.handleOnDownArrowClick}
                aria-label="Move item down"
                aria-disabled={
                  shouldOrderingButtonBeDisabled("DownArrowButton") ===
                  "disabled"
                    ? true
                    : false
                }
                className={`btn btn-sm btn-primary ${shouldOrderingButtonBeDisabled(
                  "DownArrowButton"
                )}`}
                id={
                  shouldOrderingButtonBeDisabled("DownArrowButton") ===
                  "disabled"
                    ? "disabled-move-item-btn"
                    : "move-item-btn"
                }
              >
                <i className="fa fa-arrow-down" />
              </button>
            </div>
          </td>
        </tr>
        {this.renderAssociatedItemsInGroup()}
      </>
    );
  }
}

export function mapItemClaim(claimLabel: string): React.ReactNode {
  const code = claimLabel.match(/(\d+)/);
  return code !== null ? code[0] : claimLabel;
}

export function mapItemGrade(gradeLabel: string): React.ReactNode {
  if (gradeLabel.toLowerCase() === "high school") {
    return "HS";
  } else {
    return gradeLabel.split(" ")[1];
  }
}

export function mapItemSubjectlabel(subjectLabel: string): React.ReactNode {
  return subjectLabel.toLowerCase() === "ela/literacy" ? "ELA" : subjectLabel;
}

export function getClaimValue(claimLabel: string) {
  const code = claimLabel.match(/(\d+)/);
  return code !== null ? code[0] : claimLabel;
}

export function getItemTestNameAndPosition(
  itemKey: number,
  testname: string | undefined | null,
  testOrder: number | undefined | null,
  itemIdToTestNameMap: ItemIdToTestNameMap,
  testCodeToLabelMap: TestCodeToLabel
) {
  let testNameAndPosition: TestNameAndPosition = {
    testName: "",
    testOrder: Number.MIN_VALUE
  };

  /**
   * Check if item has its asscoiated test name selected by user
   * If yes then just assign the testname label and item order to variable return that variable object
   * Else assign the very first test name & order that item is associated with
   */
  if (
    testname !== undefined &&
    testname !== null &&
    testname !== "" &&
    testOrder !== undefined &&
    testOrder !== null
  ) {
    //testname comes only with test name code, so bring test name label using code and assign to variable
    let testLabel = testname;
    if (testname in testCodeToLabelMap) {
      testLabel = testCodeToLabelMap[testname];
    }
    testNameAndPosition = { testName: testLabel, testOrder: testOrder };
  } else {
    if (itemKey in itemIdToTestNameMap) {
      testNameAndPosition = {
        testName: itemIdToTestNameMap[itemKey].testName,
        testOrder: itemIdToTestNameMap[itemKey].testOrder
      };
    }
  }
  return testNameAndPosition;
}
