export interface IRadio {
  selected: boolean;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export interface IRadioGroup {
  options: { label: string; value: string }[];
  selectedOption: string;
  onOptionChange: (value: string) => void;
}
