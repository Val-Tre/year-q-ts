import { addDays } from "date-fns";

const QuarterDates = ({
  quarterIndex,
}: {
  quarterIndex: number;
}): [Date, Date] => {
  const currentYear = new Date().getFullYear();
  const adjustedQuarterIndex = (quarterIndex - 1) % 4;
  const year = currentYear + Math.floor((quarterIndex - 1) / 4);

  const startMonth = adjustedQuarterIndex * 3;
  const startDate = new Date(year, startMonth, 1);

  // We will only display the first and the last week
  const weeks = [
    startDate, // First week
    addDays(startDate, 12 * 7), // Last week (12 weeks later)
  ];

  const updatedWeeks = weeks.map(
    (weekStart, index) =>
      index === 0
        ? new Date(weekStart) // Display start date for the first week
        : new Date(addDays(weekStart, 6)) // Display end date for the last week
  );

  return [updatedWeeks[0], updatedWeeks[1]];
};

export default QuarterDates;
