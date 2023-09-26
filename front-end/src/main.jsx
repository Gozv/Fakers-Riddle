import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register, { action as registerAction } from "./routes/register";
import Login, { action as loginAction} from "./routes/login";
import Root from "./routes/root";
import Index from "./routes";
import GameRules from "./routes/game-rules";
import AboutUs from "./routes/about-us";
import ErrorPage from "./error-page";
import CreateRoom from "./routes/create-room";
import Chat from "./components/Chat"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "/register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "/login",
        element: <Login />,
        action: loginAction
      },
      {
        path: "/game-rules",
        element: <GameRules />
      },
      {
        path: "/about-us",
        element: <AboutUs />
      }

    ],
  },
  {
    path: "/room",
    element: <CreateRoom />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/room/:roomName",
    element: <Chat/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);
