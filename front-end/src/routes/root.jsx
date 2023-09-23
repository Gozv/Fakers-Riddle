import { NavLink, Outlet } from 'react-router-dom'


function Root() {
  return (
        <main className="bg-gray-100 min-h-screen flex flex-col">
          <div id="navbar" className="bg-green-950 text-white py-4">
            <h1 className="text-2xl font-bold ml-4"><NavLink to={'/'}>Faker&apos;s Riddle</NavLink></h1>
            <nav className="bg-green-950">
              <ul className="flex justify-center">
                <li className="mr-12 hover:scale-125" >
                  <NavLink to={'/register'} className="text-white hover:text-green-700">Register</NavLink>
                </li>
                <li className="mr-12 hover:scale-125">
                  <NavLink to={'/login'} className="text-white hover:text-green-700">Login</NavLink>
                </li>
                <li className="mr-12 hover:scale-125">
                  <NavLink to={'/game-rules'} className="text-white hover:text-green-700">Game Rules</NavLink>
                </li>
                <li className="mr-12 hover:scale-125">
                  <NavLink to={'/about-us'} className="text-white hover:text-green-700">About Us</NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div id="detail">
            < Outlet />
          </div>
        </main>
  )
}

export default Root