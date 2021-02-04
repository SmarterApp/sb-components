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
  "Difficulty"
];

export const itemColumnsName_NonInterim: string[] = [
  "Item",
  "Subject",
  "Grade",
  "Stimulus ID",
  "Claim",
  "Target",
  "Standard",
  "Item Type"
];

export interface ItemColumnHeadersConfig {
  headerName: string;
  isHidden: boolean;
  isSortable?: boolean;
  columnIndex: number;
  isDefault?: boolean;
}
