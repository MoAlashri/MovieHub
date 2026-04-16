import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";

import Layout      from "./layout/Layout";
import Home        from "./pages/Home";
import Movies      from "./pages/Movies";
import TvShow      from "./pages/TvShow";
import MediaDetails from "./pages/MediaDetails";
import WatchList   from "./pages/WatchList";
import Login       from "./pages/Login";
import Register    from "./pages/Register";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index                          element={<Home />} />
      <Route path="Movies"                  element={<Movies />} />
      <Route path="TvShow"                  element={<TvShow />} />
      <Route path="media/:type/:id"         element={<MediaDetails />} />
      <Route path="WatchList"               element={<WatchList />} />
      <Route path="Login"                   element={<Login />} />
      <Route path="Register"               element={<Register />} />
      <Route path="*"                       element={<NotFoundPage />} />
    </Route>,
  ),
);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <SpeedInsights />
    </>
  );
}