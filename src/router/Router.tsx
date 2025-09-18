import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "@/router/constants";

const router = createBrowserRouter(routes);

export function Router() {
  return <RouterProvider router={router} />;
}
