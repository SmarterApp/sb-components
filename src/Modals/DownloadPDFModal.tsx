import * as React from "react";
import * as ReactModal from "react-modal";
import { ItemViewerFrame } from "@src/ItemViewer/ItemViewerFrame";
export interface DownloadPDFModalProps {
  showModal: boolean;
  url: string;
  onChangeDownloadPdfModelState: () => void;
  onResetItems: () => void;
  title?: string;
  btnText?: string;
  btnClass?: string;
  btnIcon?: string;
}

export class DownloadPDFModal extends React.Component<DownloadPDFModalProps> {
  constructor(props: DownloadPDFModalProps) {
    super(props);
  }

  handleHideModal = () => {
    this.props.onResetItems();
    this.props.onChangeDownloadPdfModelState();
  };

  downloadPDF = () => {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.href = this.props.url;
    const fileName = getFileNameAsPerDate();
    a.download = fileName;
    a.click();
    //window.URL.revokeObjectURL(this.props.downloadPDFUrl);
  };

  renderHeader() {
    return (
      <div className="modal-header">
        <h4 className="modal-title">{this.props.title}</h4>
        <button
          className="close"
          onClick={this.handleHideModal}
          aria-label="Close modal"
        >
          <span className="fa fa-times" aria-hidden="true" />
        </button>
      </div>
    );
  }

  renderFooter() {
    return (
      <div className="modal-footer">
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
    );
  }

  renderModalWrapper() {
    return (
      <div
        className="modal-wrapper"
        aria-labelledby={`${this.props.title} Modal`}
        aria-hidden="true"
      >
        {this.renderHeader()}
        <div className="modal-body">
          <ItemViewerFrame {...this.props} />
        </div>
        {this.renderFooter()}
      </div>
    );
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
          className="react-modal-content iframe-modal"
          shouldCloseOnEsc={false}
          shouldCloseOnOverlayClick={false}
        >
         {this.renderModalWrapper()}
        </ReactModal>
      </div>
    );
  }
}

function getFileNameAsPerDate() {
  const currentdatatime = new Date();
  const day = currentdatatime.getDate();
  const month = currentdatatime.getMonth();
  const year = currentdatatime
    .getFullYear()
    .toString()
    .substring(2, 5);
  const hour = currentdatatime.getHours();
  const min = currentdatatime.getMinutes();
  const sec = currentdatatime.getSeconds();
  const fileName =
    "SB_Printout_" + day + month + year + "_" + hour + min + sec + ".pdf";
  return fileName;
}
