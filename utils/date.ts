import dayjs from 'dayjs';
export const is45MinutesPassed = (date: Date | string) => {
  const currentTime = dayjs();
  const targetTime = dayjs(date);
  const differenceInMinutes = currentTime.diff(targetTime, 'minute');
  return differenceInMinutes >= 45;
};
