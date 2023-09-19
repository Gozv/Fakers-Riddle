import { NavLink, Outlet, Form, redirect } from "react-router-dom";
import FindRooms from "../components/FindRooms";

export async function action() {
  return redirect("/room/create")
}

function RoomsRoot() {
  return (
    <>
      <main className="bg-gray-100 min-h-screen flex">
        <div id="navbar" className="bg-green-950 text-white py-4">
          <h1 className="text-2xl font-bold ml-4">Faker&apos;s Riddle</h1>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
          <FindRooms />
          <nav className="bg-green-950">
            <ul className="block text-xl">
              <li className="mr-12 p-10 hover:scale-125">
                <NavLink
                  to={"/room:roomName"}
                  className="text-white hover:text-green-700"
                >
                  <div>
                    <h3>RoomName</h3>
                    <p>Available room</p>
                    <p>Numbers of players 1/4</p>
                  </div>
                </NavLink>
              </li>
              <li className="mr-12 p-10 hover:scale-125">
                <NavLink
                  to={"/room:roomName"}
                  className="text-white hover:text-green-700"
                >
                  <div>
                    <h3>RoomName</h3>
                    <p>Available room</p>
                    <p>Numbers of players 1/4</p>
                  </div>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div id="detail">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default RoomsRoot;
