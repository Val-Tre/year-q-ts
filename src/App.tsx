import { useState } from "react";
import Button from "./components/Button";
import QuarterDataTable from "./components/QuarterDataTable";
import QuarterDates from "./components/QuarterDates";
import DialogModalAddEvent from "./components/DialogModalAddEvent";
import { TypeEvent } from "./components/types";

import "./App.css";
import "./styles/bootstrap.min.css";

function App() {
  const limitQuarters: number = 8;
  const limitEvents: number = 10;

  const [quarterIndex, setQuarterIndex] = useState(0);
  const quarterStartEndDates = QuarterDates({ quarterIndex: quarterIndex + 1 });
  const [events, setEvents] = useState<TypeEvent[]>([]);
  const [eventToEdit, setEventToEdit] = useState<TypeEvent | null>(null);
  const quarterEvents = events.filter(
    (event) => event.quarterIndex === quarterIndex
  );

  // Quarter uncrement/decrement func
  const handleQuarterChange = (action: string) => {
    if (action === "increment") {
      setQuarterIndex(quarterIndex + 1);
    } else if (action === "decrement") {
      setQuarterIndex(quarterIndex - 1);
    }
  };

  // Open 'Add' modal func
  const handleModal = (action: "open" | "close"): void => {
    const dialog = document.querySelector("dialog");

    if (action === "open") {
      dialog?.showModal();
    } else if (action === "close") {
      dialog?.close();
      setEventToEdit(null);
    }
  };

  // Add/Edit event to/in array
  const handleAddEditEvent = (event: TypeEvent) => {
    setEvents((prevEvents) => {
      const eventIndex = prevEvents.findIndex(
        (thisEvent) => thisEvent.id === event.id
      );

      if (eventIndex !== -1) {
        // Event with the same ID exists, update it
        const updatedEvents = [...prevEvents];

        updatedEvents[eventIndex] = {
          ...prevEvents[eventIndex],
          name: event.name,
          startDate: event.startDate,
          endDate: event.endDate,
        };
        return updatedEvents;
      } else {
        // Event with the same ID doesn't exist, add it
        return [...prevEvents, event];
      }
    });
  };
  // Remove event from array
  const handleRemoveEvent = (eventId: string) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  };

  return (
    <div className="App">
      <DialogModalAddEvent
        quarterIndex={quarterIndex}
        quarterStartEndDates={quarterStartEndDates}
        handleModal={handleModal}
        handleAddEditEvent={handleAddEditEvent}
        eventToEdit={eventToEdit}
      />

      <QuarterDataTable
        limitQuarters={limitQuarters}
        quarterEvents={quarterEvents}
        quarterIndex={quarterIndex}
        quarterStartEndDates={quarterStartEndDates}
        quarterDecrementHandler={() => {
          handleQuarterChange("decrement");
        }}
        quarterIncrementhandler={() => {
          handleQuarterChange("increment");
        }}
        handleModal={handleModal}
        setEventToEdit={setEventToEdit}
        handleRemoveEvent={handleRemoveEvent}
      />

      <Button
        text={"Add Event"}
        className={"btn-primary"}
        onClick={() => {
          handleModal("open");
        }}
        disabled={quarterEvents.length === limitEvents}
      />
    </div>
  );
}

export default App;
