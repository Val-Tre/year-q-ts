import React from "react";
import { format, addDays } from "date-fns";

interface DateRangeMonthsProps {
  startDate: Date;
}

const DateRangeMonths: React.FC<DateRangeMonthsProps> = ({ startDate }) => {
  const numWeeks = 13; // Number of weeks to display in the quarter
  const weeks = [];

  for (let i = 0; i < numWeeks; i++) {
    const weekStart = addDays(startDate, i * 7);
    weeks.push(weekStart);
  }

  // Create an object to count the occurrences of each month
  const monthCounts: { [key: string]: number } = {};
  weeks.forEach((weekStart) => {
    const monthName = format(weekStart, "MMMM");
    if (monthCounts[monthName]) {
      monthCounts[monthName]++;
    } else {
      monthCounts[monthName] = 1;
    }
  });

  return (
    <>
      {Object.keys(monthCounts).map((monthName) => (
        <th key={monthName} colSpan={monthCounts[monthName]} scope="col">
          {monthName}
        </th>
      ))}
    </>
  );
};

export default DateRangeMonths;
