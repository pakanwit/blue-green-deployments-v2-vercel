import { IRadio } from './radio.type';
import styles from '../../styles/Wizard.module.css';

// TODO: Implement the RadioGroup component with cva
export const getRadioStyles = (selected: boolean) => {
  const baseClasses =
    'flex mb-3 items-center px-5 pl-4 border rounded-xl border-gray-300 dark:border-gray-700';
  const selectedClasses =
    'border-sky-300 border-2 transition-colors transition-width transition-duration-200';
  const deselectedClasses =
    'border-gray-200 border-opacity-50 transition-colors transition-width transition-duration-200';

  return `${baseClasses} ${selected ? selectedClasses : deselectedClasses}`;
};

export const Radio = ({ selected, label, value, onChange }: IRadio) => {
  return (
    <div className={getRadioStyles(selected)}>
      <input
        type="radio"
        id={value}
        name="radioGroup"
        value={value}
        checked={selected}
        className={styles.radio_input}
        onChange={() => onChange(value)}
      />
      <label className={styles.radio_label} htmlFor={value}>
        {label}
      </label>
    </div>
  );
};
