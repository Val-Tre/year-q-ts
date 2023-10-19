import React from "react";
import format from "date-fns/format";
import DateRangeWithEvents from "./DateRangeWithEvents";
import { TypeEvent } from "./types";

interface EventProps {
  quarterStartEndDates: [Date, Date];
  event: TypeEvent
  eventIndex: number;
  setEventToEdit: (event: TypeEvent) => void;
  handleRemoveEvent: (eventId: string) => void;
  handleModal: (action: "open" | "close") => void;
}

const Event: React.FC<EventProps> = ({
  quarterStartEndDates,
  event,
  eventIndex,
  setEventToEdit,
  handleRemoveEvent,
  handleModal,
}) => {
  return (
    <tr key={eventIndex}>
      <td>{event.name}</td>
      <td>{event.startDate && format(event.startDate, "dd/MM/yyyy")}</td>
      <td>{event.endDate && format(event.endDate, "dd/MM/yyyy")}</td>

      <DateRangeWithEvents
        quarterStartDate={quarterStartEndDates[0]}
        quarterEndDate={quarterStartEndDates[1]}
        event={event}
        setEventToEdit={setEventToEdit}
        handleRemoveEvent={handleRemoveEvent}
        handleModal={handleModal}
      />
    </tr>
  );
}

export default Event;
