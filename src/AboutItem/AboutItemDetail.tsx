import * as React from "react";
import { AboutItemModel } from "./AboutItemModels";
import { getContentStandardCode } from "@src/ItemCard/ItemCardHelperFunction";

export class AboutThisItemDetail extends React.Component<AboutItemModel, {}> {
  renderField(
    label: string,
    className: string,
    value?: string | number
  ): JSX.Element | undefined {
    if (!value && label.toLowerCase() != "item difficulty") {
      return undefined;
    }

    return (
      <p className={`card-text ${className}`} tabIndex={0}>
        <span className="card-text-label">{label}:</span>
        <span className="card-text-value"> {value}</span>
      </p>
    );
  }

  render() {
    /**
     * check if Content Standards is undefined, null or blank
     *
     */

    const subjectCode = this.props.itemCardViewModel.subjectCode;
    const claimCode = this.props.itemCardViewModel.claimCode;
    let commonCoreStandardId = this.props.itemCardViewModel
      .commonCoreStandardId;
    let ccssDescription = this.props.itemCardViewModel.ccssDescription;

    //get the new and logically updated commonCoreStandardId, ccssDescription value
    const standard = getContentStandardCode(
      subjectCode,
      claimCode,
      commonCoreStandardId,
      ccssDescription
    );
    commonCoreStandardId = standard["commonCoreStandardId"];
    ccssDescription = standard["ccssDescription"];
    const isInterimSite =
      this.props.isInterimSite !== undefined ? this.props.isInterimSite : false;
    return (
      <div className={"item-details"}>
        {this.renderField(
          "Item Id",
          "item-id",
          this.props.itemCardViewModel.itemKey
        )}
        {this.renderField(
          "Grade",
          "grade",
          this.props.itemCardViewModel.gradeLabel
        )}
        {this.renderField(
          "Subject",
          "subject",
          this.props.itemCardViewModel.subjectLabel
        )}
        {this.renderField(
          "Claim",
          "claim",
          this.props.itemCardViewModel.claimLabel
        )}
        {this.renderField(
          "Target",
          "target",
          this.props.itemCardViewModel.targetShortName
        )}
        {this.renderField(
          "Target Description",
          "target-description",
          this.props.targetDescription
        )}
        {this.renderField(
          "Content Standard",
          "ccss",
          commonCoreStandardId + ". " + ccssDescription
        )}
        {this.renderField(
          "Item Type",
          "interaction-type",
          this.props.itemCardViewModel.interactionTypeLabel
        )}
        {this.renderField(
          "Depth of Knowledge",
          "dok",
          this.props.depthOfKnowledge
        )}
        {isInterimSite
          ? this.renderField(
              "Item Difficulty",
              "item-difficulty",
              this.props.itemCardViewModel.itemDifficulty
            )
          : null}
        {this.renderField(
          "Educational Difficulty",
          "educational-difficulty",
          this.props.educationalDifficulty
        )}
        {this.renderField(
          "Evidence Statement",
          "evidence-statement",
          this.props.evidenceStatement
        )}
      </div>
    );
  }
}
