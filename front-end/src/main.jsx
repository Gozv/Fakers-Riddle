import ReactDOM from "react-dom/client"
import Rooms from "./components/Rooms"
import Chat from "./components/Chat"
import App from "./App"
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Rooms />,
  },
  {
    path: "/",
    element: <App />,
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

