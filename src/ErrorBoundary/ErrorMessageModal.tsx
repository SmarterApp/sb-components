import * as React from "react";
import * as ReactModal from "react-modal";
export interface ErrorMessageModalProps {
  showModal: boolean;
  StatusMessage: string;
  onChangeErrorModelState: () => void;
}
export class ErrorMessageModal extends React.Component<ErrorMessageModalProps> {
  constructor(props: ErrorMessageModalProps) {
    super(props);
  }
  handleHideModal = () => {
    this.props.onChangeErrorModelState();
  };
  render() {
    const modelState = this.props.showModal;
    return (
      <div className="search-result-container">
        <ReactModal
          isOpen={modelState}
          contentLabel="About This Item Modal"
          onRequestClose={this.handleHideModal}
          overlayClassName="react-modal-overlay"
          className="react-modal-content about-item-modal"
        >
          <div
            className="modal-wrapper"
            aria-labelledby="About Item Modal"
            aria-hidden="true"
          >
            <div className="modal-header">
              <h4 className="modal-title">
                <h4> </h4>
              </h4>
              <button
                className="close"
                onClick={this.handleHideModal}
                aria-label="Close modal"
              >
                <span className="fa fa-times" aria-hidden="true" />
              </button>
            </div>
            <div className="modal-body">
              <form id="accessibility-form">
                <div className="accessibility-groups">
                  <div className="accessibility-resource-type section section-light">
                    <h5 style={{ fontWeight: "bold" }}>
                      <i
                        className="error-message fa fa-exclamation-triangle"
                        aria-hidden="true"
                      />
                      {"    "}

                      {this.props.StatusMessage}
                    </h5>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                aria-label="Close modal"
                onClick={this.handleHideModal}
              >
                Ok
              </button>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}
