import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Layout from "./layout/Layout";
import NotFoundPage from "./pages/NotFoundPage";
import Movies from "./pages/Movies";
import TvShow from "./pages/TvShow";
import WatchList from "./pages/WatchList";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/Movie-details/:movieId" element={<MovieDetails />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/Movies" element={<Movies />} />
      <Route path="/TvShow" element={<TvShow />} />
      <Route path="/WatchList" element={<WatchList />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
    </Route>,
  ),
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
