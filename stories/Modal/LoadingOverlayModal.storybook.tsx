import * as React from "react";
import { storiesOf } from "@storybook/react";
import { LoadingModal } from "@src/index";

const onChangeLoadingModelState = () => {
  return;
};
storiesOf("LoadingOverlayModal", module).add("Loading Message", () => (
  <LoadingModal
    showModal={true}
    LoadingStatusMessage="Please wait while PDF is being generated..."
    onChangeLoadingModelState={onChangeLoadingModelState}
  />
));
