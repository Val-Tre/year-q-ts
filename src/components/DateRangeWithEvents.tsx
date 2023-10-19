import React from "react";
import { v4 as uuidv4 } from "uuid";
import format from "date-fns/format";
import Button from "./Button";
import { TypeEvent } from "./types";

interface DateRangeWithEventsProps {
  quarterStartDate: Date;
  quarterEndDate: Date;
  event: TypeEvent;
  setEventToEdit: (event: TypeEvent) => void;
  handleRemoveEvent: (eventId: string) => void;
  handleModal: (action: "open" | "close") => void;
}

const DateRangeWithEvents: React.FC<DateRangeWithEventsProps> = ({
  quarterStartDate,
  quarterEndDate,
  event,
  setEventToEdit,
  handleRemoveEvent,
  handleModal,
}) => {
  const weekList: JSX.Element[] = [];
  let currentWeek = new Date(quarterStartDate);
  let mergedWeeks = 0;

  while (currentWeek <= quarterEndDate) {
    const weekStartDate = new Date(currentWeek);
    weekStartDate.setHours(0, 0, 0, 0);

    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekEndDate.getDate() + 6);

    if (weekStartDate <= (event.endDate ? event.endDate : quarterStartDate) && weekEndDate >= (event.startDate ? event.startDate : quarterEndDate)) {
      mergedWeeks += 1;
    } else {
      if (mergedWeeks > 0) {
        weekList.push(
          <td key={uuidv4()} colSpan={mergedWeeks} className="table-success active">
            <div className="hover-modal">
              <h3>{event.name}</h3>
              <div>
                {event.startDate && format(event.startDate, "dd/MM/yy")} - {event.endDate && format(event.endDate, "dd/MM/yy")}
              </div>
              <div className="btn-group" role="group" aria-label="Basic example">
                <Button
                  onClick={() => {
                    setEventToEdit(event);
                    handleModal("open");
                  }}
                  text={"Edit"}
                  className={"btn-warning"}
                />
                <Button
                  onClick={() => {
                    handleRemoveEvent(event.id);
                  }}
                  text={"Delete"}
                  className={"btn-danger"}
                />
              </div>
            </div>
          </td>
        );
        mergedWeeks = 0;
      }
      weekList.push(
        <td key={uuidv4()}>
          {/* {weekStartDate.toLocaleDateString()} - {weekEndDate.toLocaleDateString()} */}
        </td>
      );
    }

    currentWeek.setDate(currentWeek.getDate() + 7);
  }

  // Check if there are merged weeks at the end of the range
  if (mergedWeeks > 0) {
    weekList.push(
      <td key={uuidv4()} colSpan={mergedWeeks}>
        {event.startDate && event.startDate.toLocaleDateString()} - {event.endDate && event.endDate.toLocaleDateString()}
      </td>
    );
  }

  return <>{weekList}</>;
};

export default DateRangeWithEvents;
