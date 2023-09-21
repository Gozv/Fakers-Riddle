import { Form } from "react-router-dom";

function FindRooms() {
  return (
    <div className="flex justify-end items-center px-4 mt-2">
      <Form id="search-form" role="search">
        <input
          id="query"
          aria-label="Search room"
          placeholder="Search"
          type="search"
          name="query"
        />
        <div id="search-spinner" aria-hidden hidden={true} />
        <div className="sr-only" aria-live="polite"></div>
      </Form>
    </div>
  );
}

export default FindRooms;
