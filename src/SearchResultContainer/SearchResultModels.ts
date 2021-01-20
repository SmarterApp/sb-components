export interface ItemColumnsName {
  columnName: string;
}

export const itemColumnsName: string[] = [
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

export interface ItemColumnHeadersConfig {
  headerName: string;
  isHidden: boolean;
  isSortable?: boolean;
  columnIndex: number;
}
