import * as React from "react";

export interface LoadingOverlayTransparentProps {
  loading: boolean;
}

// tslint:disable-next-line:variable-name
export class LoadingOverlayTransparent extends React.Component<
  LoadingOverlayTransparentProps,
  {}
> {
  render() {
    const { loading, children } = this.props;
    let content;
    if (loading) {
      content = (
        <div className="loader-overlay-transparent">
          <div className="loader loader-dark" />
        </div>
      );
    } else if (children) {
      content = children;
    }

    // tslint:disable-next-line:no-null-keyword
    return content ? content : null;
  }
}
