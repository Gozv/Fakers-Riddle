import { Form } from "react-router-dom";

function FindRooms() {
  return (
    <div className="flex justify-end items-center px-4 mt-2">
      <Form id="search-form" role="search">
        <input
          id="query"
          aria-label="Search contacts"
          placeholder="Search"
          type="search"
          name="query"
        />
        <button
          type="submit"
          className="right-2 top-1/2 transfor bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-950"
        >
          Search
        </button>
      </Form>
    </div>
  );
}

export default FindRooms;
