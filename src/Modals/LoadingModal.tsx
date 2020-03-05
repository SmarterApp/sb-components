import * as React from "react";
import * as ReactModal from "react-modal";
export interface ErrorMessageModalProps {
  showModal: boolean;
  LoadingStatusMessage: string;
  onChangeLoadingModelState: () => void;
}
export class LoadingModal extends React.Component<ErrorMessageModalProps> {
  constructor(props: ErrorMessageModalProps) {
    super(props);
  }

  handleHideModal = () => {
    this.props.onChangeLoadingModelState();
  };

  render() {
    const modelState = this.props.showModal;
    return (
      <div className="search-result-container">
        <ReactModal
          isOpen={modelState}
          contentLabel="About This Item Modal"
          // onRequestClose={this.handleHideModal}
          overlayClassName="react-modal-overlay"
          className="react-modal-content about-item-modal react-modal-download-size"
          shouldCloseOnEsc={false}
          shouldCloseOnOverlayClick={false}
        >
          <div style={{ display: "flex" }}>
            <p className="loader loader-downloading" />
            <span>{this.props.LoadingStatusMessage}</span>
          </div>
        </ReactModal>
      </div>
    );
  }
}
