import * as React from "react";
import { LoadingOverlay } from "../Layout/LoadingOverlay";

export interface FrameProps {
  url?: string;
  title?: string;
  tabIndex?: number;
  ariaHidden?: boolean;
}

export interface FrameState {
  loading: boolean;
}

export class ItemViewerFrame extends React.Component<FrameProps, FrameState> {
  constructor(props: FrameProps) {
    super(props);
    this.state = { loading: true };
  }

  startLoad = () => {
    this.setState({
      loading: true
    });
  };

  finishLoad = () => {
    this.setState({
      loading: false
    });
  };

  renderNoItem() {
    return (
      <div className="no-item">
        <p>No Item Found</p>
      </div>
    );
  }

  componentWillReceiveProps(nextProps: FrameProps) {
    if (nextProps.url !== this.props.url) {
      this.startLoad();
    }
  }

  renderProgressBar() {
    return this.state.loading ? (
      <div className="loader-icon">
        <div className="loader" />
      </div>
    ) : (
      undefined
    );
  }

  renderItem() {
    const tabIndex =
      this.props.tabIndex === undefined ? 0 : this.props.tabIndex;
    const ariaHidden =
      this.props.ariaHidden === undefined ? false : this.props.ariaHidden;
    return (
      <div
        className="itemViewerFrame"
        tabIndex={tabIndex}
        aria-hidden={ariaHidden}
      >
        {this.renderProgressBar()}
        <iframe
          // tslint:disable-next-line:react-iframe-missing-sandbox
          id="itemviewer-iframe"
          className="itemviewer-iframe"
          scrolling="no"
          onLoadStart={this.startLoad}
          onLoad={this.finishLoad}
          src={this.props.url}
          title={this.props.title || ""}
        />
      </div>
    );
  }

  render() {
    return this.props.url ? this.renderItem() : this.renderNoItem();
  }
}
