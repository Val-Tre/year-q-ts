import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { TypeEvent } from "./types";
import Button from "./Button";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface EventFormModalProps {
  quarterIndex: number;
  handleModal: (action: "open" | "close") => void;
  quarterStartEndDates: [Date, Date];
  eventToEdit: TypeEvent | null;
  handleAddEditEvent: (event: TypeEvent) => void;
}

const EventFormModal: React.FC<EventFormModalProps> = ({
  quarterIndex,
  handleModal,
  quarterStartEndDates,
  eventToEdit,
  handleAddEditEvent,
}) => {
  const [eventName, setEventName] = useState("");
  const [currentEventDates, setCurrentEventDates] = useState<
    [Date | null, Date | null]
  >([null, null]);

  useEffect(() => {
    if (eventToEdit) {
      setEventName(eventToEdit.name);
      setCurrentEventDates([eventToEdit.startDate, eventToEdit.endDate]);
    } else {
      setEventName("");
      setCurrentEventDates([null, null]);
    }
  }, [eventToEdit]);

  return (
    <dialog>
      <Button
        onClick={() => {
          handleModal("close");
        }}
        className={"close btn-close"}
      />
      <h3>{eventToEdit ? "Edit Event" : "Add an Event"}</h3>

      <form onSubmit={(e) => e.preventDefault()} name="Add or edit an event">
        <input
          type="text"
          id="eventName"
          name="eventName"
          placeholder="Event name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />

        <DatePicker
          withPortal
          selectsRange={true}
          isClearable={true}
          onChange={(update) => {
            setCurrentEventDates(update as [Date | null, Date | null]);
          }}
          wrapperClassName="datePicker"
          minDate={quarterStartEndDates[0]}
          maxDate={quarterStartEndDates[1]}
          startDate={currentEventDates[0]}
          endDate={currentEventDates[1]}
          openToDate={quarterStartEndDates[0]}
          placeholderText="Click to select dates"
        />

        <Button
          text={eventToEdit ? "Update" : "Add"}
          className={"btn-success mt-1"}
          onClick={() => {
            handleAddEditEvent({
              id: eventToEdit ? eventToEdit.id : uuidv4(),
              quarterIndex: quarterIndex,
              name: eventName,
              startDate: currentEventDates[0],
              endDate: currentEventDates[1],
            });
            setEventName("");
            setCurrentEventDates([null, null]);      
            handleModal("close");
          }}
          disabled={
            !eventName || currentEventDates.some((date) => date === null)
          }
        />
      </form>
    </dialog>
  );
};

export default EventFormModal;
