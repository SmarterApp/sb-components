import * as React from "react";
import * as ReactModal from "react-modal";

export interface FieldFilterModalProps {
  shouldOpenModal: boolean;
  handleHideFieldFilterModal: () => void;
}

export interface FieldFilterModalState {
  startingXPosition: number;
  startingYPosition: number;
}

export class FieldFilterModal extends React.Component<
  FieldFilterModalProps,
  FieldFilterModalState
> {
  constructor(props: FieldFilterModalProps) {
    super(props);
    this.state = {
      startingXPosition: 0,
      startingYPosition: 0
    };
  }

  handleHideModal = () => {
    this.props.handleHideFieldFilterModal();
  };

  render() {
    /** @type {{search: React.CSSProperties}} */
    // const styles1:React.CSSProperties = {
    //     ...styles,
    //     top: this.state.startingYPosition,
    //     left: this.state.startingXPosition
    // }

    return (
      <div className="search-result-container">
        <ReactModal
          isOpen={this.props.shouldOpenModal}
          contentLabel="Field Filter Modal Opened"
          onRequestClose={this.handleHideModal}
          overlayClassName="react-modal-overlay "
          className=""
          shouldCloseOnEsc={true}
          shouldCloseOnOverlayClick={true}
          // style={styles1}
        >
          <div className="modal-wrapper" aria-labelledby="Print Cart">
            <div className="modal-header">
              <h4 className="modal-title">Print Cart</h4>
            </div>

            <div className="modal-body">
              <div
                className="status-message-print"
                role="dialog"
                aria-labelledby="printCartItemsCount"
                aria-describedby="printCartItemsCount"
                tabIndex={0}
              />
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-primary btn-sm "
                aria-label="Close print cart modal"
                onClick={this.handleHideModal}
              >
                Close
              </button>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}
