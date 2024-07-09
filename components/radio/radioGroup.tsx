import { Radio } from '.';
import { IRadioGroup } from './radio.type';

export const RadioGroup = ({
  options,
  selectedOption,
  onOptionChange,
}: IRadioGroup) => {
  return (
    <div>
      {options.map((option) => (
        <Radio
          key={option.value}
          selected={selectedOption === option.value}
          label={option.label}
          value={option.value}
          onChange={onOptionChange}
        />
      ))}
    </div>
  );
};
