import { useEffect } from 'react';
import trackEvent from '../../utils/trackEvent';
import { debounce } from 'lodash';

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
  id: string;
  className: string;
  placeholder?: string;
  page: string;
  ref?: React.MutableRefObject<HTMLInputElement>;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveUserData?: {
    id: string;
    title: string;
    isCurrency?: boolean;
    isPercent?: boolean;
  };
  onWheel?: (e: React.WheelEvent<HTMLInputElement>) => void; // Add this line
};

const Input = ({
  value,
  onChange,
  type,
  name,
  id,
  className,
  placeholder,
  page,
  ref,
  onBlur = () => {},
  saveUserData,
  onWheel, // Add this line
  ...props
}: Props) => {
  useEffect(() => {
    if (value && type !== 'radio') {
      handleInputChange(value);
    }
  }, [value]);

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    trackEvent({
      event_name: 'type',
      value: e.target.value,
      page: page,
      field_id: id,
      isInput: true,
    });
    onBlur(e);
  };

  const debouceTime = type === 'radio' ? 0 : 1000;
  const handleInputChange = debounce((value) => {
    const formData = JSON.parse(localStorage.getItem('formData')) || {};
    let newValue;
    if (saveUserData?.isCurrency) {
      newValue = parseInt(value.toString().replace(/,/g, '') || '');
    } else if (saveUserData?.isPercent) {
      newValue = parseFloat(value) / 100;
    } else {
      newValue = value;
    }
    if (saveUserData?.id) {
      formData[saveUserData?.title] = {
        id: saveUserData?.id,
        value: newValue,
      };
      localStorage.setItem('formData', JSON.stringify(formData));
    }
  }, debouceTime);

  return (
    <input
      value={value}
      onChange={(e) => {
        saveUserData?.id && handleInputChange(e.target.value, saveUserData);
        onChange(e);
      }}
      type={type}
      name={name}
      id={id}
      className={className}
      placeholder={placeholder}
      ref={ref}
      {...props}
      onBlur={handleBlur}
      onWheel={onWheel} // Add this line
    />
  );
};

export default Input;
