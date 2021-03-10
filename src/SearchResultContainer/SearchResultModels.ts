export interface ItemColumnsName {
  columnName: string;
}

export const itemColumnsName_Interim: string[] = [
  "Item",
  "Stimulus ID",
  "Item position in test",
  "Subject",
  "Grade",
  "Test Name",
  "Claim",
  "Target",
  "Standard",
  "DOK",
  "Difficulty",
  "Answer key"
];

export const itemColumnsName_NonInterim: string[] = [
  "Item",
  "Stimulus ID",
  "Subject",
  "Grade",
  "Claim",
  "Target",
  "Standard",
  "Item Type",
  "Answer key"
];

export interface ItemColumnHeadersConfig {
  headerName: string;
  isHidden: boolean;
  isSortable?: boolean;
  columnIndex: number;
  isDefault?: boolean;
}
