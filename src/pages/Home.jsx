import React from 'react'
import Header from '../components/Header'
import MovieList from '../components/MovieList'
import Pagination from '../components/Pagination'

export default function Home() {
  return (

    <div>
      <Header />
      <div className='bg-gray-200 p-6 m-8 mt-0 rounded'>
        <h1 className='text-2xl font-bold mb-3 '>Welcome to our Movie App</h1>
        <p className='text-sm text-gray-400 mb-3'>Lorem ipsum dolor ss aliquid maiores doloribus magnam accusant incidunt ea tempore aut.</p>
        <div className='flex gap-2'>
          <input type='text' className='p-2 w-[80%] rounded  outline-none focus:ring-4 ring-blue-300 transition-all placeholder-gray-800  ' placeholder='Search Here .... '/> 
          <button className='bg-blue-500 px-4 py-2 rounded text-white font-semibold hover:bg-blue-600 transition-all '>Search</button>
        </div>

      </div>
      <MovieList/>
      <Pagination/>
    </div>

  )
}
