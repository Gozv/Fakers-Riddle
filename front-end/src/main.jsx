import ReactDOM from "react-dom/client"
import Rooms from "./components/Rooms"
import Chat from "./components/Chat"
import App from "./App"
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Register from "./components/Register"
import Login from "./components/Login"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path:'/login',
    element: <Login />
  },
  {
    path: "/room",
    element: <Rooms />,
  },
  {
    path: "/room/:roomName",
    element: <Chat />,
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
)

