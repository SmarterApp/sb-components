import * as React from "react";
import { SelectOption, SelectOptionProps } from "./SelectOption";
import { ItemCard } from "@src/ItemCard/ItemCard";
import { ItemCardModel } from "@src/ItemCard/ItemCardModels";

/**
 * Select tag properties
 * @interface SelectProps
 */
export interface SelectProps {
  onChange: (val: string, item?: ItemCardModel) => void;
  // onChangeWithItem: (item: ItemCard, val: string) => void;
  label: string;
  selected: string;
  disabled?: boolean;
  options: SelectOptionProps[];
  className?: string;
  labelClass?: string;
  wrapperClass?: string;
  tabIndex?: number;
  forItem?: ItemCardModel;
}

/**
 * Creates A11y friendly Select tag element
 * @param {SelectProps} props select props
 * @returns JSX React Component
 */
// tslint:disable-next-line:variable-name
export const Select: React.SFC<SelectProps> = props => {
  const selectOptions = props.options.map(item => (
    <SelectOption {...item} key={item.value} />
  ));

  return (
    <div className={props.wrapperClass || ""}>
      <label htmlFor={props.label}>
        <span className={props.labelClass || ""}>{props.label}</span>
      </label>
      <select
        className={`form-control ${props.className || ""}`}
        onChange={e =>
          props.onChange(
            e.target.value,
            props.forItem !== undefined ? props.forItem : undefined
          )
        }
        value={props.selected}
        id={props.label}
        aria-label={props.label}
        disabled={props.disabled}
        tabIndex={props.tabIndex}
      >
        {selectOptions}
      </select>
    </div>
  );
};
