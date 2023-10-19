import React from "react";
import Button from "./Button";
import Event from "./Event";
import DateRangeMonths from "./DateRangeMonths";
import DateRangeWeeks from "./DateRangeWeeks";
import { TypeEvent } from "./types";

interface QuarterDataTableProps {
  quarterIndex: number;
  quarterStartEndDates: [Date, Date];
  quarterDecrementHandler: () => void;
  quarterIncrementhandler: () => void;
  limitQuarters: number;
  quarterEvents: TypeEvent[];
  setEventToEdit: (event: TypeEvent) => void;
  handleRemoveEvent: (eventId: string) => void;
  handleModal: (action: "open" | "close") => void;
}

const QuarterDataTable: React.FC<QuarterDataTableProps> = ({
  quarterIndex,
  quarterStartEndDates,
  quarterDecrementHandler,
  quarterIncrementhandler,
  limitQuarters,
  quarterEvents,
  setEventToEdit,
  handleRemoveEvent,
  handleModal,
}) => {
  const currentYear = new Date().getFullYear();
  const adjustedQuarterIndex = quarterIndex % 4;
  const year = currentYear + Math.floor(quarterIndex / 4);

  return (
    <div>
      <header>
        <Button
          text={"Previous Q"}
          disabled={quarterIndex === 0}
          onClick={quarterDecrementHandler}
          className={"btn-primary"}
        />
        <h2>
          Quarter {adjustedQuarterIndex + 1} - {year}
        </h2>
        <Button
          text={"Next Q"}
          onClick={quarterIncrementhandler}
          disabled={quarterIndex + 1 >= limitQuarters}
          className={"btn-primary"}
        />
      </header>

      <table className="table">
        <thead>
          <tr>
            <th colSpan={3}></th>
            <DateRangeMonths startDate={quarterStartEndDates[0]} />
          </tr>
        </thead>

        <tbody>
          <tr>
            <th scope="row">Task Name</th>
            <th scope="row">Start Date</th>
            <th scope="row">End Date</th>
            <DateRangeWeeks
              startDate={quarterStartEndDates[0]}
              endDate={quarterStartEndDates[1]}
            />
          </tr>

          {quarterEvents.length > 0 && (
            <>
              {quarterEvents.map((event: TypeEvent, index: number) => (
                <Event
                  quarterStartEndDates={quarterStartEndDates}
                  key={index}
                  event={event}
                  eventIndex={index}
                  handleModal={handleModal}
                  setEventToEdit={setEventToEdit}
                  handleRemoveEvent={handleRemoveEvent}
                />
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default QuarterDataTable;
