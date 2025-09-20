import { Routes, Route, } from 'react-router-dom'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import Layout from './Layoّut'

import { createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />} >
    <Route index element={<Home />} />
    <Route path='/Movie-details/:movieId' element={<MovieDetails />} />
    <Route path='*' element={<NotFoundPage />} />
  </Route>
))

function App() {

  return (
    <>
      {/* <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Movie-details/:movieId' element={<MovieDetails />} />
      </Routes> */}
      <RouterProvider router={router} />
    </>
  )
}

export default App