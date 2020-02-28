 //Modal for print - old**
  // handleShowModal = (modelState: boolean): void => {
  //   let visibleItems = this.props.itemCards;
  //   let selectedItemCount = 0;
  //   if (visibleItems !== undefined) {
  //     for (let i = 0; i < visibleItems.length; i++) {
  //       if (visibleItems[i].selected === true) {
  //         selectedItemCount = selectedItemCount + 1;
  //       }
  //     }
  //   }
  //   if (selectedItemCount == 0 || selectedItemCount < 0) {
  //     this.setState({
  //       showErrorModal: modelState,
  //       statusMessage: "Please select at least one item to print"
  //     });
  //   } else {
  //     this.setState({
  //       showModal: modelState,
  //       statusMessage: selectedItemCount.toString()
  //     });
  //   }
  // };

  // renderPrintButton(viewType: SearchResultType): JSX.Element {
  //   return (
  //     <button
  //       onClick={() => this.handleShowPrintCartModal(true)}
  //       aria-label="Print Item"
  //       title="Print Items"
  //       className={"btn btn-default"}
  //     >
  //       <i aria-hidden="true" className="glyphicon glyphicon-th-large glyphicon-print" /> Print
  //     </button>
  //   );
  // }


    // renderResetButton(): JSX.Element {
  //   return (
  //     <button
  //       onClick={this.handleResetItems}
  //       aria-label="Clear Selection"
  //       title="Clear Selection"
  //       className={"btn btn-default"}
  //     >
  //       <i aria-hidden="true" className="glyphicon glyphicon-th-large glyphicon-refresh" /> Clear
  //       Selection
  //     </button>
  //   );
  // }