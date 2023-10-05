export type Array_selectors = Selection[];

export type Selection = {
  question: string;
  answers: Array<string>;
  answers_to_api: Array<string>;
};

export type SelectionState = {
  steps: Array_selectors;
  selectedToApi: Array<string>,
  current_step: number;
  current_request: string;
  result?: Array<string> | string;
  error: string | undefined;
};
