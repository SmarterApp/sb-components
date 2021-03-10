import { getRequest } from "@src/ApiModel";
import { ItemModel } from "@src/ItemPage/ItemPageModels";
import { SampleItemScoringModel } from "@src/Rubric/RubricModels";

export const getAnswerKeysModel = (params: ItemModel) =>
  getRequest<SampleItemScoringModel>("/Item/AnswerKeysModel", params);

/** If testing in storybook call api to itemsampler running in another project as application */
export const getAnswerKeysModelStoryBookTesting = (params: ItemModel) =>
  getRequest<SampleItemScoringModel>(
    "https://localhost:44371/Item/AnswerKeysModel",
    params
  );
