import * as React from "react";
import * as ReactModal from "react-modal";
export interface DownloadPDFModalProps {
  showModal: boolean;
  downloadPDFUrl: string;
  onChangeDownloadPdfModelState: () => void;
}

export class DownloadPDFModal extends React.Component<DownloadPDFModalProps> {
  constructor(props: DownloadPDFModalProps) {
    super(props);
  }

  handleHideModal = () => {
    this.props.onChangeDownloadPdfModelState();
  };

  downloadPDF = () => {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.href = this.props.downloadPDFUrl;
    a.download = "download.pdf";
    a.click();
    window.URL.revokeObjectURL(this.props.downloadPDFUrl);

  }

  render() {
    const modelState = this.props.showModal;
    return (
      <div className="search-result-container">
        <ReactModal
          isOpen={modelState}
          contentLabel="About This Item Modal"
          onRequestClose={this.handleHideModal}
          overlayClassName="react-modal-overlay"
          className="react-modal-content about-item-modal react-modal-download-size"
          shouldCloseOnEsc={false}
          shouldCloseOnOverlayClick={false}
        >
          <div
            className="modal-wrapper"
            aria-labelledby="About Item Modal"
            aria-hidden="true"
            // style={{width:"400px"}}
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
                    PDF is ready to download.
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <a
                style={{ marginLeft: "30%", color: "white" }}
                href={this.props.downloadPDFUrl}
                target="_blank"
                className="btn btn-primary"
                role="button"
                // onClick={this.handleHideModal}
              >
                <i className="fa fa-eye" aria-hidden="true" />  View PDF
              </a>

              <button
                className="btn btn-primary"
                aria-label="Close modal"
                onClick={this.downloadPDF}
              > 
                <i className="fa fa-download"></i>
                  {"  "} Download PDF
              </button>

              <button
                className="btn btn-primary"
                aria-label="Close modal"
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
