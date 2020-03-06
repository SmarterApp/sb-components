import * as React from "react";
import * as ReactModal from "react-modal";
export interface DownloadPDFModalProps {
  showModal: boolean;
  downloadPDFUrl: string;
  onChangeDownloadPdfModelState: () => void;
  onResetItems: () => void;
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
    a.href = this.props.downloadPDFUrl;
    const fileName = getFileNameAsPerDate();
    a.download = fileName;
    a.click();
    //window.URL.revokeObjectURL(this.props.downloadPDFUrl);

  }

  // viewPDF = () => {
  //   let params = `width=600,height=300,left=100,top=100`;
    
  //   let SB_PrintOutWindow:any = window.open('', "SB_PrintOutWindow", params);
  //   SB_PrintOutWindow.location = this.props.downloadPDFUrl;
  //   SB_PrintOutWindow.opener = null;
  //   SB_PrintOutWindow.blur();
  //   SB_PrintOutWindow.focus();

  //   // myWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(base64data)+"'></iframe>"
    
  // }

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
                  <div className="accessibility-resource-type section section-light pdf-download-msg">
                  <i className="fa fa-lg fa-check"></i> {"  "} PDF is ready to download.
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">

              {/* <button className="btn btn-primary" onClick={this.viewPDF}>
                <i className="fa fa-eye" aria-hidden="true" />
                {"  "} View PDF
              </button> */}

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


function getFileNameAsPerDate() {
  const currentdatatime = new Date();
  const day = currentdatatime.getDate();
  const month = currentdatatime.getMonth();
  const year = currentdatatime.getFullYear().toString().substring(2, 5);
  const hour = currentdatatime.getHours();
  const min = currentdatatime.getMinutes();
  const sec = currentdatatime.getSeconds();
  const fileName = "SB_Printout_" + day + month + year + "_" + hour + min + sec + '.pdf';
  return fileName;
}

