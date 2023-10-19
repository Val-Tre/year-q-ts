import React from "react";

interface DateRangeWeeksProps {
  startDate: Date;
  endDate: Date;
}

const DateRangeWeeks: React.FC<DateRangeWeeksProps> = ({
  startDate,
  endDate,
}) => {
  const weeks: JSX.Element[] = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const weekNumber = weeks.length + 1;
    const weekText = `Week ${weekNumber}`;
    weeks.push(<td key={weekNumber}>{weekText}</td>);

    // Move to the next week
    currentDate.setDate(currentDate.getDate() + 7);
  }

  return <>{weeks}</>;
};

export default DateRangeWeeks;