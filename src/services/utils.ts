const MILISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

export const dayDifference = (startDate: Date, endDate: Date) => {
  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(timeDiff / MILISECONDS_PER_DAY);
  return diffDays;
};
