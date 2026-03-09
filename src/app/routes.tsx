import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Chat } from "./pages/Chat";
import { Discover } from "./pages/Discover";
import { Alerts } from "./pages/Alerts";
import { History } from "./pages/History";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "chat", Component: Chat },
      { path: "discover", Component: Discover },
      { path: "alerts", Component: Alerts },
      { path: "history", Component: History },
    ],
  },
]);
