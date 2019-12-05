import * as React from "react";
import { RubricModel, RubricAnswerKeyModel } from "./RubricModels";
export interface RubricAnswerKeyProps {
  rubrics: RubricModel[];
}
export class RubricRichText extends React.Component<RubricAnswerKeyProps, {}> {
  renderRubric(rubric: RubricModel, index: number) {
    let rows: RubricAnswerKeyModel[] = [];
    if (
      rubric.rubricEntries &&
      rubric.rubricEntries.length > 0 &&
      rubric.language == "English"
    ) {
      rows = rubric.rubricEntries.map(entry => {
        const sample = rubric.samples.find(
          s =>
            s.sampleResponses &&
            s.sampleResponses[0] &&
            s.sampleResponses[0].scorePoint === entry.scorepoint
        );
        const sampleHtml = sample
          ? sample.sampleResponses.map(sr => sr.sampleContent).join("<br/>")
          : "";
        return {
          name: entry.name,
          AnswerKey: entry.value
        };
      });
    }

    const leftAlign: React.CSSProperties = {
      textAlign: "left"
    };
    // tslint:disable:react-no-dangerous-html
    const rowsJsx = rows.map((row, i) => (
      <div key={i} dangerouslySetInnerHTML={{ __html: row.AnswerKey }} />
    ));
    // tslint:enable:react-no-dangerous-html
    return rowsJsx;
  }
  render() {
    return this.props.rubrics.map((r, i) => this.renderRubric(r, i));
  }
}
