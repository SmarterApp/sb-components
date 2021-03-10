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
  pdfContentType: string;
  isInterim: boolean;
}

export class DownloadPDFModal extends React.Component<DownloadPDFModalProps> {
  constructor(props: DownloadPDFModalProps) {
    super(props);
  }

  handleHideModal = () => {
    //this.props.onResetItems();
    this.props.onChangeDownloadPdfModelState();
  };

  downloadPDF = () => {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.href = this.props.url;
    const fileName = getFileNameAsPerDate(
      this.props.pdfContentType,
      this.props.isInterim
    );
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
          aria-label="Close PDF modal"
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
          aria-label="Download PDF"
          onClick={this.downloadPDF}
        >
          <i className="fa fa-download" />
          {"  "} Download PDF
        </button>

        <button
          className="btn btn-primary"
          aria-label="Close PDF modal"
          onClick={this.handleHideModal}
        >
          Close
        </button>
      </div>
    );
  }

  renderModalWrapper() {
    return (
      <div className="modal-wrapper" aria-labelledby={`PDF Modal`}>
        {this.renderHeader()}
        <div className="modal-body" tabIndex={-1} aria-hidden="true">
          <ItemViewerFrame {...this.props} tabIndex={-1} ariaHidden={true} />
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
          contentLabel="PDF modal opened"
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

function getFileNameAsPerDate(pdfContentType: string, isInterim: boolean) {
  const currentdatatime = new Date();
  const day = currentdatatime.getDate();
  const month = currentdatatime.getMonth() + 1;
  const year = currentdatatime
    .getFullYear()
    .toString()
    .substring(2, 5);
  const hour = currentdatatime.getHours();
  const min = currentdatatime.getMinutes();
  const sec = currentdatatime.getSeconds();

  const baseFileName = isInterim ? "Interim Items " : "Sample Items ";

  if (pdfContentType == "ANSWERS-AND-ITEMS") {
    return (
      baseFileName +
      "and Answer Key Printout-" +
      day +
      "-" +
      month +
      "-" +
      year +
      ".pdf"
    );
  } else if (pdfContentType == "ANSWERS-ONLY") {
    return "Answer Key Printout-" + day + "-" + month + "-" + year + ".pdf";
  } else {
    return baseFileName + "Printout-" + day + "-" + month + "-" + year + ".pdf";
  }
}
