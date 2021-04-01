import * as React from "react";
import { RubricModel } from "./RubricModels";
import { ItemCardModel } from "../ItemCard/ItemCardModels";
import { RubricRichText } from "./RubricRichText";
import { RubricTable } from "../Rubric/RubricTable";
export interface RendererRubricProps {
  itemCardViewModel: ItemCardModel;
  rubrics?: RubricModel[];
  answerKey?: string;
}
export interface PageState {
  showLabelAsRubric: boolean;
  RenderRubricAsTable: boolean;
}
export class RubricRenderer extends React.Component<
  RendererRubricProps,
  PageState,
  {}
> {
  constructor(props: RendererRubricProps) {
    super(props);
    this.state = {
      /*To set label name as Rubric for type 'Writing extended response and Short answer'*/
      showLabelAsRubric:
        this.props.itemCardViewModel.interactionTypeCode == "WER" ||
        this.props.itemCardViewModel.interactionTypeCode == "SA"
          ? true
          : false,
      /*To show Rubric response as a table for type 'Short answer'*/
      RenderRubricAsTable:
        this.props.itemCardViewModel.interactionTypeCode == "SA" ? true : false
    };
  }
  renderResult() {
    return (
      <div className="item-content ">
        {this.state.showLabelAsRubric ? (
          <span className="card-text-label">Rubric: </span>
        ) : (
          <span className="card-text-label">Answer Key: </span>
        )}
        <span className="card-text-value">
          {this.state.RenderRubricAsTable ? (
            <RubricTable
              rubrics={this.props.rubrics ? this.props.rubrics : []}
              showExampler={false}
            />
          ) : (
            <RubricRichText
              rubrics={this.props.rubrics ? this.props.rubrics : []}
            />
          )}
        </span>
      </div>
    );
  }
  render() {
    return this.renderResult();
  }
}
