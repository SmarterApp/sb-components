import * as React from "react";
import * as ReactModal from "react-modal";
import { ItemCardModel } from "@src/ItemCard/ItemCardModels";
import { ItemModel } from "@src/ItemPage/ItemPageModels";
import { SampleItemScoringModel } from "@src/Rubric/RubricModels";
import { getRequest } from "@src/ApiModel";
import { Subscription } from "@src/Common/Subscription";
import { getResourceContent, Resource } from "@src/Common/ApiResource";
import { LoadingOverlay } from "@src/Layout/LoadingOverlay";
import { RubricRenderer } from "@src/Rubric/RubricRenderer";

export interface AnswerKeyModalProps {
  showModal: boolean;
  itemCard: ItemCardModel;
  closeAnswerKeysModal: () => void;
}

export interface AnswerKeyModalState {
  answerKeysRubric: Resource<SampleItemScoringModel>;
  loading: boolean;
  rubric?: SampleItemScoringModel;
  showModal: boolean;
}

export const getAnswerKeysModel = (params: ItemModel) =>
  getRequest<SampleItemScoringModel>("/Item/AnswerKeysModel", params);

// export const getAnswerKeysModel = (params: ItemModel) =>
//   getRequest<SampleItemScoringModel>("https://localhost:44371/Item/AnswerKeysModel", params);

export class AnswerKeyModal extends React.Component<
  AnswerKeyModalProps,
  AnswerKeyModalState
> {
  constructor(props: AnswerKeyModalProps) {
    super(props);
    this.state = {
      answerKeysRubric: { kind: "loading" },
      loading: true,
      showModal: this.props.showModal || false
    };
  }

  componentDidUpdate() {
    if (this.props.showModal) {
      this.getAnswerKeysRubric();
    }
  }

  // componentDidMount() {
  //   if (this.props.showModal && this.state.rubric === undefined) {
  //     this.getAnswerKeysRubric();
  //   }
  // }

  // componentWillUnmount() {
  //   this.subscription.cancelAll();
  //   // const btnDisplayAnswerKeys = document.getElementById("btn_display_answerkeys_" + this.props.itemCard.itemKey);
  //   // btnDisplayAnswerKeys?.removeEventListener("click", () => alert("Hi user!"));
  // }

  handleShowAnswerKeysModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (this.state.rubric === undefined) this.getAnswerKeysRubric();
  };

  handleHideAnswerKeysModal = () => {
    // this.setState({ showModal: false });
    this.props.closeAnswerKeysModal();
  };

  onFetchAnswerKeysRubric = (data: SampleItemScoringModel) => {
    console.log("Here come : ", data);
    this.setState({ rubric: data, loading: false });
  };

  onFetchAnswerKeysRubricError = (message: any) => {
    console.log(message);
  };

  getAnswerKeysRubric = () => {
    const item: ItemModel = {
      bankKey: this.props.itemCard.bankKey,
      itemKey: this.props.itemCard.itemKey
    };

    getAnswerKeysModel(item)
      .then(data => this.onFetchAnswerKeysRubric(data))
      .catch(err => this.onFetchAnswerKeysRubricError(err));
  };

  displayAnswerKeysRubrics() {
    if (this.state.loading) {
      return <p className="loader loader-downloading loader-fetching" />;
    } else if (this.state.rubric) {
      const answerKeysRubrics = this.state.rubric;
      let props = {
        itemCardViewModel: this.props.itemCard,
        showLabel: false,
        rubrics: answerKeysRubrics ? answerKeysRubrics.rubrics : [],
        answerKey: answerKeysRubrics ? answerKeysRubrics.answerKey : ""
      };
      return (
        <div>
          <RubricRenderer {...props} />
        </div>
      );
    }
  }

  render() {
    return (
      <>
        {/* <button
          type="button"
          onClick={e => {
            this.handleShowAnswerKeysModal(e);
          }}
          className="btn"
          id={"btn_display_answerkeys_" + this.props.itemCard.itemKey}
        >
          View
        </button> */}
        <ReactModal
          // isOpen={this.state.showModal}
          isOpen={this.props.showModal}
          contentLabel="Answer Key Information Modal"
          onRequestClose={this.handleHideAnswerKeysModal}
          overlayClassName="react-modal-overlay"
          className="react-modal-content rubric-table-modal"
        >
          <div
            className="modal-wrapper"
            aria-labelledby="Answer Key Information Modal"
            aria-hidden="true"
          >
            <div className="modal-header">
              <h4 className="modal-title">Answer Keys/Rubrics</h4>
              <button
                className="close"
                onClick={this.handleHideAnswerKeysModal}
                aria-label="Close modal"
              >
                <span className="fa fa-times" aria-hidden="true" />
              </button>
            </div>
            <div className="modal-body">
              {/* {this <p className="loader loader-downloading" />} */}
              {this.displayAnswerKeysRubrics()}
              {/* {this.state.rubric === undefined ? "heyyy" : this.state.rubric.answerKey} */}
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                aria-label="Close modal"
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
