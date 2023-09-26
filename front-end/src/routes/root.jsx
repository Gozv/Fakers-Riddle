import { NavLink, Outlet } from "react-router-dom";

function Root() {
  return (
    <main className="bg-gradient-to-b from-sky-400 to-sky-200 flex flex-col">
      <div className="navbar h-14">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink
                  to={"/register"}
                  className="text-white hover:text-zinc-400 hover:bg-info-content"
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/login"}
                  className="text-white hover:text-zinc-400 hover:bg-info-content"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/game-rules"}
                  className="text-white hover:text-zinc-400 hover:bg-info-content"
                >
                  Game Rules
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/about-us"}
                  className="text-white hover:text-zinc-400 hover:bg-info-content"
                >
                  About Us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <NavLink to={"/"} className="btn btn-ghost font-serif font-bold justify-items-center normal-case text-3xl">Faker&apos;s Riddle</NavLink>
        </div>
        <div className="navbar-end">
          <button className="btn  invisible btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </main>
  );
}

export default Root;
