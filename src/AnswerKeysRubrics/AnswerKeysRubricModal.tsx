import * as React from "react";
import * as ReactModal from "react-modal";
import { ItemCardModel } from "@src/ItemCard/ItemCardModels";
import { ItemModel } from "@src/ItemPage/ItemPageModels";
import { SampleItemScoringModel } from "@src/Rubric/RubricModels";
import { RubricRenderer } from "@src/Rubric/RubricRenderer";
import {
  getAnswerKeysModel,
  getAnswerKeysModelStoryBookTesting
} from "./AnswerKeysRubricModels";

export interface AnswerKeysRubricModalProps {
  showModal: boolean;
  itemCard: ItemCardModel;
  closeAnswerKeysModal: () => void;
}

export interface AnswerKeysRubricModalState {
  loading: boolean;
  answerKeysRubrics?: SampleItemScoringModel;
  errorMessage?: string;
}

export class AnswerKeysRubricModal extends React.Component<
  AnswerKeysRubricModalProps,
  AnswerKeysRubricModalState
> {
  constructor(props: AnswerKeysRubricModalProps) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidUpdate() {
    if (this.props.showModal && this.state.loading) {
      this.getAnswerKeysRubric();
    }
  }

  handleShowAnswerKeysModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (this.state.answerKeysRubrics === undefined) this.getAnswerKeysRubric();
  };

  handleHideAnswerKeysModal = () => {
    this.props.closeAnswerKeysModal();
  };

  onFetchAnswerKeysRubric = (data: SampleItemScoringModel) => {
    this.setState({ answerKeysRubrics: data, loading: false });
  };

  onFetchAnswerKeysRubricError = (message: any) => {
    this.setState({ errorMessage: message, loading: false });
  };

  getAnswerKeysRubric = () => {
    const item: ItemModel = {
      bankKey: this.props.itemCard.bankKey,
      itemKey: this.props.itemCard.itemKey
    };

    //If testing in storybook call api to itemsampler running in another project as application
    if (location.host === "localhost:6006") {
      getAnswerKeysModelStoryBookTesting(item)
        .then(data => this.onFetchAnswerKeysRubric(data))
        .catch(err => this.onFetchAnswerKeysRubricError(err));
    } else {
      getAnswerKeysModel(item)
        .then(data => this.onFetchAnswerKeysRubric(data))
        .catch(err => this.onFetchAnswerKeysRubricError(err));
    }
  };

  displayAnswerKeysRubrics() {
    if (!this.state.loading && this.state.errorMessage !== undefined) {
      return (
        <div
          className="alert alert-danger"
          tabIndex={0}
          aria-label="There is an error while loading answer keys or rubrics."
        >
          <strong>Error</strong> while loading answer keys or rubrics.
        </div>
      );
    }

    if (this.state.loading) {
      return <p className="loader loader-downloading loader-fetching" />;
    } else if (this.state.answerKeysRubrics) {
      const answerKeysRubrics = this.state.answerKeysRubrics;
      let props = {
        itemCardViewModel: this.props.itemCard,
        showLabel: false,
        rubrics: answerKeysRubrics ? answerKeysRubrics.rubrics : [],
        answerKey: answerKeysRubrics ? answerKeysRubrics.answerKey : ""
      };
      return (
        <div tabIndex={0}>
          <RubricRenderer {...props} />
        </div>
      );
    }
  }

  render() {
    return (
      <>
        <ReactModal
          isOpen={this.props.showModal}
          contentLabel="Answer keys or rubrics modal opened"
          onRequestClose={this.handleHideAnswerKeysModal}
          overlayClassName="react-modal-overlay"
          className="react-modal-content rubric-table-modal"
        >
          <div className="modal-wrapper" aria-labelledby="Answer Keys/Rubrics">
            <div className="modal-header">
              <h4 className="modal-title">Answer Keys/Rubrics</h4>
              <button
                className="close"
                onClick={this.handleHideAnswerKeysModal}
                aria-label="Close answer keys or rubrics modal"
              >
                <span className="fa fa-times" aria-hidden="true" />
              </button>
            </div>
            <div className="modal-body answer-keys-modal-body">
              {this.displayAnswerKeysRubrics()}
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                aria-label="Close answer keysor rubrics modal"
                onClick={this.handleHideAnswerKeysModal}
              >
                Close
              </button>
            </div>
          </div>
        </ReactModal>
      </>
    );
  }
}
